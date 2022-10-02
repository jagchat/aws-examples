'use strict';

const params = require('./params');

exports.handler = async function (event, context) {
    console.log("DemoUnencParamStoreLambda: Started..\n");

    let response = {
        statusCode: 200,
        body: null,
    };

    try {
        let p = new params();
        var result = await p.getParameter("DemoUnencParamStoreConfig");

        //converting JSON to string is a must
        //https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoUnencParamStoreLambda: Completed..\n");
    return response;
};