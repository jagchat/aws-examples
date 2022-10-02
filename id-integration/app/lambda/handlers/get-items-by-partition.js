'use strict';

//const { DbOperations } = require('./classes/DbOperations.js');
const { Utils } = require('../../classes/Utils.js');
const { GetItemsByPartitionLambda } = require('../wrappers/GetItemsByPartitionLambda.js');

exports.handler = async function (event, context) {
    console.log("IdIntegrationGetItemsByPartitionLambda: Started..\n");

    let response = Utils.getDefaultResponse();

    try {
        // if (event.httpMethod !== 'GET') {
        //     throw new Error(`get-item-by-key only accept GET method, you tried: ${event.httpMethod}`)
        // }
        let result = await (new GetItemsByPartitionLambda()).getItemsByPartition(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("IdIntegrationGetItemsByPartitionLambda: Completed..\n");
    return response;
};

// const getItemsByPartition = async (event) => {
//     let result = [];
//     try {
//         console.log(`IdIntegrationGetItemsByPartitionLambda.getItemsByPartition: fetching input params..\n`);
//         let partitionKey = getInputParams(event);

//         var params = {
//             TableName: Utils.getTableName(),
//             KeyConditionExpression: "#prtKey = :prtValue",
//             ExpressionAttributeNames: {
//                 "#prtKey": "orgTenantId"
//             },
//             ExpressionAttributeValues: {
//                 ":prtValue": partitionKey
//             }
//         };
//         console.log(`IdIntegrationGetItemsByPartitionLambda.getItemsByPartition: fetching data..\n`);
//         result = await (new DbOperations()).getItemsByPartition(params);
//     } catch (err) {
//         throw err
//     }
//     return result
// }

// const getInputParams = (event) => {
//     let key;

//     if (event.requestContext != null) {
//         console.log(`IdIntegrationGetItemsByPartitionLambda.getInputParams: API Gateway request, extracting params...\n`);
//         key = event.pathParameters.orgTenantId;
//     }
//     else {
//         console.log(`IdIntegrationGetItemsByPartitionLambda.getInputParams: Lambda request..\n`);
//         key = event;
//     }

//     console.log(`IdIntegrationGetItemsByPartitionLambda.getInputParams: partition key: ${JSON.stringify(key)}..\n`);
//     return key;
// }