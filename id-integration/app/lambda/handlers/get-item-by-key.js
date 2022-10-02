'use strict';

const { Utils } = require('../../classes/Utils.js');
const { GetItemByKeyLambda } = require('../wrappers/GetItemByKeyLambda.js');

exports.handler = async function (event, context) {
    console.log("IdIntegrationGetItemByKeyLambda: Started..\n");

    let response = Utils.getDefaultResponse();

    try {
        // if (event.httpMethod !== 'GET') {
        //     throw new Error(`get-item-by-key only accept GET method, you tried: ${event.httpMethod}`)
        // }
        //let result = await getItemByKey(event);
        let result = await (new GetItemByKeyLambda()).getItemByKey(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("IdIntegrationGetItemByKeyLambda: Completed..\n");
    return response;
};
