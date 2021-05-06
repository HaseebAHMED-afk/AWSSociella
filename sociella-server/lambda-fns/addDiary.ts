const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Diary from './Diary'

async function addDiary(diary: Diary) {
    const params = {
        TableName: process.env.SOCIELLA_TABLE,
        Item: diary
    }

    try {
        await docClient.put(params).promise();
        return diary
    } catch (error) {
        console.log('Error: ', error);
        return null
    }
}

export default addDiary