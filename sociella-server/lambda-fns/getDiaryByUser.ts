const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


async function getDiaryByUser(user: string) {
    
    const params = {
        TableName: process.env.SOCIELLA_TABLE,
        Key:{
            user: user
        }
    }

    try {
        const data = await docClient.get(params).promise();
        return data.Items
    } catch (error) {
        console.log('Error: ', error);
        return null
    }

}

export default getDiaryByUser