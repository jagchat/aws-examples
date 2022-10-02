'use strict';

const { SaveItemBase } = require('../../operations/SaveItemBase.js');

class SaveItemLambda extends SaveItemBase {

    async saveItem(event) {
        let result = {};
        try {
            console.log(`SaveItemLambda.saveItem: fetching input params..\n`);
            let itemPosted = this.getInputParams(event);
            result = await super.saveItem(itemPosted);
        } catch (err) {
            throw err
        }
        return result;
    }

    getInputParams(event) {
        let body;

        if (event.requestContext != null) {
            console.log(`SaveItemLambda.getInputParams: API Gateway request, extracting params...\n`);
            body = JSON.parse(event.body);
        }
        else {
            console.log(`SaveItemLambda.getInputParams: Lambda request..\n`);
            body = event;
        }

        //console.log(`IdIntegrationAddItemLambda.getInputParams: body: ${JSON.stringify(body)}..\n`);
        return body;
    }

}

module.exports = { SaveItemLambda }