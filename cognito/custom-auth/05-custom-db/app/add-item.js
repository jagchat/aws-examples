'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoUserDbAddItemLambda: Started..\n");

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

    console.log("DemoUserDbAddItemLambda: Completed..\n");
    return response;
};

const addItem = async (event) => {
    let response
    try {
        console.log(`DemoUserDbAddItemLambda.addItem: fetching config..\n`);
        let config = JSON.parse(process.env.DemoUserDbParamStoreConfig);
        console.log(`DemoUserDbAddItemLambda.addItem: fetching input params..\n`);
        let item = getInputParams(event);
        let params = {
            TableName: config.tablename,
            Item: item
        }
        console.log(`DemoUserDbAddItemLambda.addItem: saving data..\n`);
        response = await docClient.put(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {

    let body;

    if (event.requestContext != null) {
        console.log(`DemoUserDbAddItemLambda.getInputParams: API Gateway request, extracting params...\n`);
        body = JSON.parse(event.body);
    }
    else {
        console.log(`DemoUserDbAddItemLambda.getInputParams: Lambda request..\n`);
        body = event;
    }

    console.log(`DemoUserDbAddItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
    return body;
}