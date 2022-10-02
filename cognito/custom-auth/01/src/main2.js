import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';

AWS.config.region = 'us-east-2';

var poolData = {
    UserPoolId: 'us-east-2_32QZBjg1x',
    ClientId: '59oafp8kdjpi2nd28ephe18puv'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);




export default () => {

    $('#LoginButton').on("click", async (event) => {
        event.preventDefault();
        $('#message').text("");
        try {
            var username = $('#inputUserName').val();
            var password = $('#inputPassword').val();

            var userData = {
                Username: username,
                Pool: userPool,
            };
            var authenticationData = {
                Username: username,
                Password: password
            };


            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('SUCCESS');
                    console.log(result);
                },
                onFailure: function (err) {
                    console.log('ERROR');
                    console.log(err);
                },
                customChallenge: function (challengeParameters) {
                    // User authentication depends on challenge response
                    console.log(challengeParameters);
                    cognitoUser.sendCustomChallengeAnswer(password, this);
                },
            });



            // let accessTokenMarkup = `<tr><td>Access Token</td><td>${user.signInUserSession.accessToken.jwtToken}</td></tr>`;
            // let idTokenMarkup = `<tr><td>Id Token</td><td>${user.signInUserSession.idToken.jwtToken}</td></tr>`;
            // let refreshTokenMarkup = `<tr><td>Refresh Token</td><td>${user.signInUserSession.refreshToken.token}</td></tr>`;
            // $('#message').html(`<table class="table">${accessTokenMarkup + idTokenMarkup + refreshTokenMarkup}</table>`);
            // console.log(user);
        } catch (e) {
            console.error('Login Error: ', e);
            $('#message').text("Could not login");
        }
    });

}