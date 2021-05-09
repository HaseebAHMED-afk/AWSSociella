import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as appsync from '@aws-cdk/aws-appsync'
import * as dbb from '@aws-cdk/aws-dynamodb'
import * as cognito from '@aws-cdk/aws-cognito'

export class SociellaServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const userPool = new cognito.UserPool(this , 'SociellaUserPool' , {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: true
      },
      userVerification:{
        emailStyle: cognito.VerificationEmailStyle.CODE
      },
      standardAttributes:{
        email:{
          required: true,
          mutable: true
        }
      }
    })

    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this , 'SociellaGoogleProvider' , {
      userPool: userPool,
      clientId: '',
      clientSecret: '',
      attributeMapping:{
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME
      },
      scopes: ['profile' , 'email' , 'openid']
    })


    userPool.registerIdentityProvider(googleProvider)

    const userPoolClient = new cognito.UserPoolClient(this , 'SociellaUserPoolClient' , {
      userPool,
      oAuth:{
        callbackUrls:['http://localhost:8000'],
        logoutUrls:['http://localhost:8000']
      }
    })

    const domain = userPool.addDomain('domain' , {
      cognitoDomain:{
        domainPrefix: 'sociella-domain'
      }
    })

    const api = new appsync.GraphqlApi(this , 'SociellaAPI' , {
      name: 'SociellaAPI',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig:{
        defaultAuthorization:{
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig:{
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        }
      },
      xrayEnabled: true
    })

    const sociellaLambdas = new lambda.Function(this , 'SociellaLambdas' , {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-fns'),
      memorySize: 1024
    })

    const lambdaDS = api.addLambdaDataSource('lambdaDataSource' , sociellaLambdas)

    lambdaDS.createResolver({
      typeName: 'Query',
      fieldName: 'getDiaries'
    })

    lambdaDS.createResolver({
      typeName:'Mutation',
      fieldName: 'addDiary'
    })

    lambdaDS.createResolver({
      typeName:'Mutation',
      fieldName:'deleteDiary'
    })

    const sociellaTable = new dbb.Table(this , 'SociellaTable' , {
      partitionKey:{
        name: 'id',
        type: dbb.AttributeType.STRING
      }
    })

    sociellaTable.grantFullAccess(sociellaLambdas)

    sociellaLambdas.addEnvironment('SOCIELLA_TABLE' , sociellaTable.tableName)

    new cdk.CfnOutput(this , "GraphQLAPIUrl" , {
      value: api.graphqlUrl
    })
    
    new cdk.CfnOutput(this , "GraphQLAPIKey" , {
      value: api.apiKey || ``
    })


    new cdk.CfnOutput(this , "StackRegion" , {
      value: this.region
    })


    new cdk.CfnOutput(this , "UserPoolClientId" , {
      value: userPoolClient.userPoolClientId
    })


    new cdk.CfnOutput(this , "UserPoolId" , {
      value: userPool.userPoolId
    })


    new cdk.CfnOutput(this , "Domain Name" , {
      value: domain.domainName
    })

  }
}
