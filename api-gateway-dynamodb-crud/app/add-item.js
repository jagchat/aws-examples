'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoDynamoDbAddItemLambda: Started..\n");

    let response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: null,
    };

    try {
        // if (event.httpMethod !== 'POST') {
        //     throw new Error(`add-item only accept POST method, you tried: ${event.httpMethod}`)
        // }        
        let result = await addItem(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoDynamoDbAddItemLambda: Completed..\n");
    return response;
};

const addItem = async (event) => {
    let response
    try {
        console.log(`DemoDynamoDbAddItemLambda.addItem: fetching config..\n`);
        let config = JSON.parse(process.env.DemoDynamoDbParamStoreConfig);
        console.log(`DemoDynamoDbAddItemLambda.addItem: fetching input params..\n`);
        let item = getInputParams(event);
        let params = {
            TableName: config.tablename,
            Item: item
        }
        console.log(`DemoDynamoDbAddItemLambda.addItem: saving data..\n`);
        response = await docClient.put(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {

    let body;

    if (event.requestContext != null) {
        console.log(`DemoDynamoDbAddItemLambda.getInputParams: API Gateway request, extracting params...\n`);
        body = JSON.parse(event.body);
    }
    else {
        console.log(`DemoDynamoDbAddItemLambda.getInputParams: Lambda request..\n`);
        body = event;
    }

    console.log(`DemoDynamoDbAddItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
    return body;
}