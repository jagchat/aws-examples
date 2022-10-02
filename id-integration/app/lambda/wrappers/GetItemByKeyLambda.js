'use strict';

const { GetItemByKeyBase } = require('../../operations/GetItemByKeyBase.js');

class GetItemByKeyLambda extends GetItemByKeyBase {

    async getItemByKey(event) {
        let result = {};
        try {
            console.log(`GetItemByKeyLambda.getItemByKey: fetching input params..\n`);
            let key = this.getInputParams(event);
            result = await super.getItemByKey(key);
        } catch (err) {
            throw err
        }
        return result;
    }

    getInputParams(event) {
        let key = {
            orgTenantId: null,
            entityId: null
        };

        if (event.requestContext != null) {
            console.log(`GetItemByKeyLambda.getInputParams: API Gateway request, extracting params...\n`);
            key.orgTenantId = event.pathParameters.orgTenantId;
            key.entityId = event.pathParameters.entityId;
        }
        else {
            console.log(`GetItemByKeyLambda.getInputParams: Lambda request..\n`);
            key = event;
        }

        console.log(`GetItemByKeyLambda.getInputParams: key: ${JSON.stringify(key)}..\n`);
        return key;
    }
}

module.exports = { GetItemByKeyLambda }