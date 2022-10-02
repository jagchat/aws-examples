import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
    Auth: {
        region: 'us-east-2',
        userPoolId: 'us-east-2_wsp0nEQt4',
        userPoolWebClientId: '3qrv16j2l9i5boipktnhfvqi4l',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})

async function signIn(email, password) {
    return Auth.signIn({
        username: email,
        password
    })
}

export default () => {

    $('#LoginButton').on("click", async (event) => {
        event.preventDefault();
        $('#message').text("");
        try {
            var username = $('#inputUserName').val();
            var password = $('#inputPassword').val();
            let user = await signIn(username, password);
            let accessTokenMarkup = `<tr><td>Access Token</td><td>${user.signInUserSession.accessToken.jwtToken}</td></tr>`;
            let idTokenMarkup = `<tr><td>Id Token</td><td>${user.signInUserSession.idToken.jwtToken}</td></tr>`;
            let refreshTokenMarkup = `<tr><td>Refresh Token</td><td>${user.signInUserSession.refreshToken.token}</td></tr>`;
            $('#message').html(`<table class="table">${accessTokenMarkup + idTokenMarkup + refreshTokenMarkup}</table>`);
            console.log(user);
        } catch (e) {
            console.error('Login Error: ', e);
            $('#message').text("Could not login");
        }
    });

}