'use strict';

const { DbOperations } = require('../classes/DbOperations.js');
const { Utils } = require('../classes/Utils.js');

class DeleteItemBase {

    async deleteItem(itemPosted) {
        let response
        try {
            let params = {
                TableName: Utils.getTableName(),
                Key: itemPosted
            }
            console.log(`DeleteItemBase.deleteItem: fetching existing data..\n`);
            let fetchedItem = await (new DbOperations()).getItemByBidirectionalKey(params);
            if (fetchedItem.orgTenantId) { //data found
                console.log(`DeleteItemBase.deleteItem: shaping items to process..\n`);
                let items2save = this.getItems2Process(itemPosted, fetchedItem)
                console.log(`DeleteItemBase.deleteItem: deleting data..\n`);
                response = await (new DbOperations()).processTransaction(items2save);
            }

        } catch (err) {
            throw err
        }
        return response
    }

    getItems2Process(item2delete, fetchedItem) {
        let items2save = [];
        let isBidirectionalItem = fetchedItem.orgTenantId != item2delete.orgTenantId && fetchedItem.entityId != item2delete.entityId;
        if (isBidirectionalItem) {
            //if bi-directional item, delete it and remove it from "data" of main record
            console.log(`DeleteItemBase.getItems2Process: it is a bi-directional item..\n`);
            var newData = fetchedItem.data.filter(o => o.key !== item2delete.orgTenantId && o.value !== item2delete.entityId);
            fetchedItem.data = newData;
            items2save.push({
                Put: {
                    TableName: Utils.getTableName(),
                    Item: fetchedItem
                }
            });
        }
        else {
            console.log(`DeleteItemBase.getItems2Process: it is the main item..\n`);
            //if it is main record, delete main record along with all bi-directional items
            fetchedItem.data.forEach((element, index, array) => {
                items2save.push({
                    Delete: {
                        TableName: Utils.getTableName(),
                        Key: {
                            orgTenantId: element.key,
                            entityId: element.value,
                        }
                    }
                });
            });
        }

        items2save.push({
            Delete: {
                TableName: Utils.getTableName(),
                Key: item2delete
            }
        });

        return items2save;
    }
}

module.exports = { DeleteItemBase }

