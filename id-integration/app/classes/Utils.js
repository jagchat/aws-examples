const AWS = require('aws-sdk')

class Utils {

    constructor() {
    }

    static getConfig() {
        return this.config;
    }

    static getTableName() {
        return this.config.tablename
    }

    static getDefaultResponse() {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: null,
        };
    }
}

Utils.config = JSON.parse(process.env.IdIntegrationParamStoreConfig);
module.exports = { Utils }