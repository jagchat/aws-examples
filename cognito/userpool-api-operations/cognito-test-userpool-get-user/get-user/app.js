//const axios = require('axios')
const AWS = require('aws-sdk')
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        let userId;
        userId = event.userId;
        const user = await cognito.adminGetUser({
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: userId,
        }).promise()

        console.log(user.UserAttributes)
        console.log(user.Username)
        console.log(user.UserStatus);

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                user: user,
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
