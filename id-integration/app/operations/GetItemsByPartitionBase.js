'use strict';

const { DbOperations } = require('../classes/DbOperations.js');
const { Utils } = require('../classes/Utils.js');

class GetItemsByPartitionBase {

    async getItemsByPartition(partitionKey) {
        let result = [];
        try {
            var params = {
                TableName: Utils.getTableName(),
                KeyConditionExpression: "#prtKey = :prtValue",
                ExpressionAttributeNames: {
                    "#prtKey": "orgTenantId"
                },
                ExpressionAttributeValues: {
                    ":prtValue": partitionKey
                }
            };
            console.log(`GetItemsByPartitionBase.getItemsByPartition: fetching data..\n`);
            result = await (new DbOperations()).getItemsByPartition(params);
        } catch (err) {
            throw err
        }
        return result
    }

}

module.exports = { GetItemsByPartitionBase }

