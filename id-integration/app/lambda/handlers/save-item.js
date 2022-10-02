'use strict';

const { Utils } = require('../../classes/Utils.js');
const { SaveItemLambda } = require('../wrappers/SaveItemLambda.js');

exports.handler = async function (event, context) {
    console.log("IdIntegrationSaveItemLambda: Started..\n");

    let response = Utils.getDefaultResponse();

    try {
        // if (event.httpMethod !== 'POST') {
        //     throw new Error(`save-item only accept POST method, you tried: ${event.httpMethod}`)
        // }
        let result = await (new SaveItemLambda()).saveItem(event);
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("IdIntegrationSaveItemLambda: Completed..\n");
    return response;
};
