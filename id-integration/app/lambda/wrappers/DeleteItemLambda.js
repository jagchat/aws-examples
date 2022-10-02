'use strict';

const { DeleteItemBase } = require('../../operations/DeleteItemBase.js');

class DeleteItemLambda extends DeleteItemBase {

    async deleteItem(event) {
        let result = {};
        try {
            console.log(`DeleteItemLambda.deleteItem: fetching input params..\n`);
            let key = this.getInputParams(event);
            result = await super.deleteItem(key);
        } catch (err) {
            throw err
        }
        return result;
    }

    getInputParams(event) {
        let body = {};

        if (event.requestContext != null) {
            console.log(`DeleteItemLambda.getInputParams: API Gateway request, extracting params...\n`);
            body.orgTenantId = event.pathParameters.orgTenantId;
            body.entityId = event.pathParameters.entityId;
        }
        else {
            console.log(`DeleteItemLambda.getInputParams: Lambda request..\n`);
            body = event;
        }

        console.log(`DeleteItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
        return body;
    }

}

module.exports = { DeleteItemLambda }