const axios = require('axios')
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
        if (event.pathParameters) {
            userId = event.pathParameters.userId;
        }
        else {
            userId = event.userId;
        }

        let user = {};
        try {
            user = await cognito.adminGetUser({
                UserPoolId: process.env.COGNITO_USER_POOL_ID,
                Username: userId,
            }).promise()
        } catch (err) { //user not found...fetch from user service
            console.log('User Not Found...checking with user service');
            const userServiceEndpoint = process.env.USER_SERVICE_ENDPOINT;
            let userServiceResp = await axios.get(`${userServiceEndpoint}/items/${userId}`);
            //console.log(userServiceResp);

            if (userServiceResp.data.Item) {
                console.log('User found in user service.  Creating user in user pool');
                let createUserResult = await cognito.adminCreateUser({
                    UserPoolId: process.env.COGNITO_USER_POOL_ID,
                    Username: userId,
                    TemporaryPassword: userServiceResp.data.Item.Password
                }).promise()
                console.log(createUserResult);

                console.log('Confirming user in user pool');
                let confirmUserResult = await cognito.adminSetUserPassword({
                    UserPoolId: process.env.COGNITO_USER_POOL_ID,
                    Username: userId,
                    Password: userServiceResp.data.Item.Password,
                    Permanent: true
                }).promise()

                console.log('Ensuring new user in User Pool..');
                user = await cognito.adminGetUser({
                    UserPoolId: process.env.COGNITO_USER_POOL_ID,
                    Username: userId,
                }).promise()

            }
            else {
                //not found
                throw err;
            }
        }

        console.log(user.Username)
        console.log(user.UserStatus);
        console.log(user.UserAttributes)

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
