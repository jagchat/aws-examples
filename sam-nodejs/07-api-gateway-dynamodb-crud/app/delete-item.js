'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoDynamoDbDeleteItemLambda: Started..\n");

    let response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: null,
    };

    try {
        // if (event.httpMethod !== 'DELETE') {
        //     throw new Error(`delete-item only accept DELETE method, you tried: ${event.httpMethod}`)
        // }        
        let result = await deleteItem(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoDynamoDbDeleteItemLambda: Completed..\n");
    return response;
};

const deleteItem = async (event) => {
    let response
    try {
        console.log(`DemoDynamoDbDeleteItemLambda.deleteItem: fetching config..\n`);
        let config = JSON.parse(process.env.DemoDynamoDbParamStoreConfig);
        console.log(`DemoDynamoDbDeleteItemLambda.deleteItem: fetching input params..\n`);
        let item = getInputParams(event);
        let params = {
            TableName: config.tablename,
            Key: item
        }
        console.log(`DemoDynamoDbDeleteItemLambda.deleteItem: deleting data..\n`);
        response = await docClient.delete(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {

    let body = {};

    if (event.requestContext != null) {
        console.log(`DemoDynamoDbDeleteItemLambda.getInputParams: API Gateway request, extracting params...\n`);
        body.Album = event.pathParameters.album;
        body.Artist = event.pathParameters.artist;
    }
    else {
        console.log(`DemoDynamoDbDeleteItemLambda.getInputParams: Lambda request..\n`);
        body = event;
    }

    console.log(`DemoDynamoDbDeleteItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
    return body;
}