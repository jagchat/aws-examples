'use strict';

const { DbOperations } = require('../classes/DbOperations.js');
const { Utils } = require('../classes/Utils.js');

class GetItemByKeyBase {

    async getItemByKey(key) {
        let result = {};
        try {
            console.log(`GetItemByKeyBase.getItemByKey: fetching input params..\n`);

            let params = {
                TableName: Utils.getTableName(),
                Key: key
            }
            result = await (new DbOperations()).getItemByBidirectionalKey(params);
        } catch (err) {
            throw err
        }
        return result;
    }

}

module.exports = { GetItemByKeyBase }

