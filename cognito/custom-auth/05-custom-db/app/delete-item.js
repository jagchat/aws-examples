'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoUserDbDeleteItemLambda: Started..\n");

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

    console.log("DemoUserDbDeleteItemLambda: Completed..\n");
    return response;
};

const deleteItem = async (event) => {
    let response
    try {
        console.log(`DemoUserDbDeleteItemLambda.deleteItem: fetching config..\n`);
        let config = JSON.parse(process.env.DemoUserDbParamStoreConfig);
        console.log(`DemoUserDbDeleteItemLambda.deleteItem: fetching input params..\n`);
        let item = getInputParams(event);
        let params = {
            TableName: config.tablename,
            Key: item
        }
        console.log(`DemoUserDbDeleteItemLambda.deleteItem: deleting data..\n`);
        response = await docClient.delete(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {

    let body = {};

    if (event.requestContext != null) {
        console.log(`DemoUserDbDeleteItemLambda.getInputParams: API Gateway request, extracting params...\n`);
        body.UserId = event.pathParameters.UserId;
    }
    else {
        console.log(`DemoUserDbDeleteItemLambda.getInputParams: Lambda request..\n`);
        body = event;
    }

    console.log(`DemoUserDbDeleteItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
    return body;
}