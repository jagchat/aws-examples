// Create new AWS SDK object(s)
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

class params {

    constructor() {

    }

    getParameter(name) {
        let p = new Promise((resolve, reject) => {
            //SAM doesn't support local param store yet https://github.com/aws/aws-sam-cli/issues/616
            if (name in process.env) {
                console.log("params.getParameter: fetching parameters from env variable");
                resolve(process.env[name]);
            }
            else {
                console.log("params.getParameter: fetching parameters from parameter store");
                var params = {
                    Name: name,
                    WithDecryption: false
                };
                ssm.getParameter(params, (err, data) => {
                    if (err) return reject(err);
                    resolve(data.Parameter.Value);
                });
            }
        });
        return p;
    }
};

module.exports = params;