'use strict';

const { GetItemsByPartitionBase } = require('../../operations/GetItemsByPartitionBase.js');

class GetItemsByPartitionLambda extends GetItemsByPartitionBase {

    async getItemsByPartition(event) {
        let result = {};
        try {
            console.log(`GetItemsByPartitionLambda.getItemsByPartition: fetching input params..\n`);
            let key = this.getInputParams(event);
            result = await super.getItemsByPartition(key);
        } catch (err) {
            throw err
        }
        return result;
    }

    getInputParams(event) {
        let key;

        if (event.requestContext != null) {
            console.log(`GetItemsByPartitionLambda.getInputParams: API Gateway request, extracting params...\n`);
            key = event.pathParameters.orgTenantId;
        }
        else {
            console.log(`GetItemsByPartitionLambda.getInputParams: Lambda request..\n`);
            key = event;
        }

        console.log(`GetItemsByPartitionLambda.getInputParams: partition key: ${JSON.stringify(key)}..\n`);
        return key;
    }
}

module.exports = { GetItemsByPartitionLambda }