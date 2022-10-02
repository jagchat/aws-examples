'use strict';

const s3ops = require('./s3operations');

exports.handler = async function (event, context) {
    console.log("DemoListS3BucketsApi: Started..\n");

    let response = {
        statusCode: 200,
        body: null,
    };

    // //-> simple and straight forward
    // let AWS = require('aws-sdk'); //usually declared as "const" at top
    // let s3 = new AWS.S3(); //usually declared as "const" at top
    // let data = await s3.listBuckets().promise();
    // response.body = JSON.stringify(data);
    // console.log("DemoListS3BucketsApi: Completed..\n");
    // return response;

    // //-> with better coding style
    try {
        let ops = new s3ops();
        var result = await ops.getBuckets();

        //converting JSON to string is a must
        //https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/
        response.body = JSON.stringify(result);
    }
    catch (ex) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: ex.toString() });
    }

    console.log("DemoListS3BucketsApi: Completed..\n");
    return response;
};