const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteDiary(diaryId:string) {
    const params = {
        TableName: process.env.SOCIELLA_TABLE,
        Key:{
            diaryId: diaryId
        }
    }

    try {
        await docClient.delete(params).promise();
        return diaryId
    } catch (error) {
        console.log('Error: ', error);
        return null
    }
}

export default deleteDiary