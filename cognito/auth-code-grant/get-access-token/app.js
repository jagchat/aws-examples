const AWS = require('amazon-cognito-identity-js');

const userPool = new AWS.CognitoUserPool({
    UserPoolId: 'us-east-2_wsp0nEQt4',
    ClientId: '453n1df95ku0klsm6r6fuenoaf'
});

const login = ({ username, password }) => {
    console.log(username);
    const cognitoUser = new AWS.CognitoUser({
        Username: username,
        Pool: userPool
    });

    const authenticationDetails = new AWS.AuthenticationDetails({
        Username: username,
        Password: password
    });

    return new Promise((success, error) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log('successfully authenticated', result);
                success(result);
            },

            onFailure: (err) => {
                console.log('error authenticating', err);
                error(err);
            }
        });
    });
};

login({ username: 'scott', password: 'Scott123?' });