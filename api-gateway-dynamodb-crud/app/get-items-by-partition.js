'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoDynamoDbGetItemsByPartitionLambda: Started..\n");

    let response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: null,
    };

    try {
        // if (event.httpMethod !== 'GET') {
        //     throw new Error(`get-items-by-partition only accept GET method, you tried: ${event.httpMethod}`)
        // }
        let result = await getItemsByPartition(event)
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoDynamoDbGetItemsByPartitionLambda: Completed..\n");
    return response;
};

const getItemsByPartition = async (event) => {
    let response
    try {
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getItemsByPartition: fetching config..\n`);
        let config = JSON.parse(process.env.DemoDynamoDbParamStoreConfig);
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getItemsByPartition: fetching input params..\n`);
        let partitionKey = getInputParams(event);
        //data looks like this
        // {
        //     "Album": "Red", //Partition Key
        //     "Artist": "Taylor Swift" //Sort Key
        //      ...//more attributes
        // }
        var params = {
            TableName: config.tablename,
            KeyConditionExpression: "#album = :album",
            ExpressionAttributeNames: {
                "#album": "Album"
            },
            ExpressionAttributeValues: {
                ":album": partitionKey
            }
        };
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getItemsByPartition: params ${JSON.stringify(params)}..\n`);
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getItemsByPartition: fetching data..\n`);
        response = await docClient.query(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {
    let key;

    if (event.requestContext != null) {
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getInputParams: API Gateway request, extracting params...\n`);
        key = event.pathParameters.album;
    }
    else {
        console.log(`DemoDynamoDbGetItemsByPartitionLambda.getInputParams: Lambda request..\n`);
        key = event;
    }

    console.log(`DemoDynamoDbGetItemsByPartitionLambda.getInputParams: key: ${JSON.stringify(key)}..\n`);
    return key;
}