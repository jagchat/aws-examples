'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoUserDbGetItemByKeyLambda: Started..\n");

    let response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: null,
    };

    try {
        // if (event.httpMethod !== 'GET') {
        //     throw new Error(`get-item-by-key only accept GET method, you tried: ${event.httpMethod}`)
        // }
        let result = await getItemByKey(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoUserDbGetItemByKeyLambda: Completed..\n");
    return response;
};

const getItemByKey = async (event) => {
    let response
    try {
        console.log(`DemoUserDbGetItemByKeyLambda.getItemByKey: fetching config..\n`);
        let config = JSON.parse(process.env.DemoUserDbParamStoreConfig);
        console.log(`DemoUserDbGetItemByKeyLambda.getItemByKey: fetching input params..\n`);
        let key = getInputParams(event);

        let params = {
            TableName: config.tablename,
            Key: key
        }
        console.log(`DemoUserDbGetItemByKeyLambda.getItemByKey: fetching data..\n`);
        response = await docClient.get(params).promise()
        console.log(`DemoUserDbGetItemByKeyLambda.getItemByKey: received following response from Db..\n`);
        console.log(response);
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {
    let key = {
        UserId: null
    };

    if (event.requestContext != null) {
        console.log(`DemoUserDbGetItemByKeyLambda.getInputParams: API Gateway request, extracting params...\n`);
        key.UserId = event.pathParameters.userid || event.pathParameters.UserId;
    }
    else {
        console.log(`DemoUserDbGetItemByKeyLambda.getInputParams: Lambda request..\n`);
        key = event;
    }

    console.log(`DemoUserDbGetItemByKeyLambda.getInputParams: key: ${JSON.stringify(key)}..\n`);
    return key;
}