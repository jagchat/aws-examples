'use strict';

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async function (event, context) {
    console.log("DemoDynamoDbGetItemByKeyLambda: Started..\n");

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

    console.log("DemoDynamoDbGetItemByKeyLambda: Completed..\n");
    return response;
};

const getItemByKey = async (event) => {
    let response
    try {
        console.log(`DemoDynamoDbGetItemByKeyLambda.getItemByKey: fetching config..\n`);
        let config = JSON.parse(process.env.DemoDynamoDbParamStoreConfig);
        console.log(`DemoDynamoDbGetItemByKeyLambda.getItemByKey: fetching input params..\n`);
        let key = getInputParams(event);

        //data looks like this
        // {
        //     "Album": "Red", //Partition Key
        //     "Artist": "Taylor Swift" //Sort Key
        //      ...//more attributes
        // }

        let params = {
            TableName: config.tablename,
            Key: key
        }
        console.log(`DemoDynamoDbGetItemByKeyLambda.getItemByKey: fetching data..\n`);
        response = await docClient.get(params).promise()
    } catch (err) {
        throw err
    }
    return response
}

const getInputParams = (event) => {
    let key = {
        Album: null,
        Artist: null
    };

    if (event.requestContext != null) {
        console.log(`DemoDynamoDbGetItemByKeyLambda.getInputParams: API Gateway request, extracting params...\n`);
        key.Album = event.pathParameters.album;
        key.Artist = event.pathParameters.artist;
    }
    else {
        console.log(`DemoDynamoDbGetItemByKeyLambda.getInputParams: Lambda request..\n`);
        key = event;
    }

    console.log(`DemoDynamoDbGetItemByKeyLambda.getInputParams: key: ${JSON.stringify(key)}..\n`);
    return key;
}