const AWS = require('aws-sdk')

class DbOperations {
    constructor() {
        this._docClient = new AWS.DynamoDB.DocumentClient();
    }

    async getItemByKey(params) {
        let result = {};
        console.log(`DbOperations.getItemByKey: fetching data..\n`);
        let response = await this._docClient.get(params).promise()
        if (response.Item) {
            result = response.Item;
        }
        return result;
    }

    async getItemByBidirectionalKey(params) {
        let result = {};
        console.log(`DbOperations.getItemByBidirectionalKey: fetching data..\n`);
        let response = await this._docClient.get(params).promise()
        if (response.Item && response.Item.map) {
            console.log(`DbOperations.getItemByBidirectionalKey: has map, fetching parent..\n`);
            let newParams = JSON.parse(JSON.stringify(params)); //TODO: fix this
            newParams.Key.orgTenantId = response.Item.map.orgTenantId;
            newParams.Key.entityId = response.Item.map.entityId;
            response = await this._docClient.get(newParams).promise();
        }
        if (response.Item) {
            result = response.Item;
        }
        return result;
    }

    async getItemsByPartition(params) {
        let result = {};
        console.log(`DbOperations.getItemsByPartition: fetching data..\n`);
        let response = await this._docClient.query(params).promise()
        if (response.Items) {
            result = response.Items;
        }
        return result;
    }

    async deleteItemByKey(params) {
        let result = {};
        console.log(`DbOperations.deleteItemByKey: fetching data..\n`);
        let response = await this._docClient.delete(params).promise()
        if (response.Items) {
            result = response.Items;
        }
        return result;
    }

    async processTransaction(params) {
        let result = {};
        var shapedParams = {
            TransactItems: params
        };
        console.log(`DbOperations.processTransaction: fetching data..\n`);
        let response = await this._docClient.transactWrite(shapedParams).promise();
        if (response.Items) {
            result = response.Items;
        }
        else if (response.Item) {
            result = response.Item;
        }
        return result;
    }
}

module.exports = { DbOperations }