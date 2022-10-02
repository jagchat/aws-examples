'use strict';

const { Utils } = require('../../classes/Utils.js');
const { DeleteItemLambda } = require('../wrappers/DeleteItemLambda.js');

exports.handler = async function (event, context) {
    console.log("IdIntegrationDeleteItemLambda: Started..\n");

    let response = Utils.getDefaultResponse();

    try {
        // if (event.httpMethod !== 'DELETE') {
        //     throw new Error(`delete-item only accept DELETE method, you tried: ${event.httpMethod}`)
        // }        
        let result = await (new DeleteItemLambda()).deleteItem(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("IdIntegrationDeleteItemLambda: Completed..\n");
    return response;
};
