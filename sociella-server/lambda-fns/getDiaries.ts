const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getDiaries() {
    const params = {
        TableName: process.env.SOCIELLA_TABLE
    }

    try {
        const data = await docClient.scan(params).promise();
        return data.Items
    } catch (error) {
        console.log('Error: ', error);
        return null
    }
}

export default getDiaries