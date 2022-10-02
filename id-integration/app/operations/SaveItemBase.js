'use strict';

const { DbOperations } = require('../classes/DbOperations.js');
const { Utils } = require('../classes/Utils.js');
const { DeleteItemBase } = require('../operations/DeleteItemBase.js');

class SaveItemBase {

    async saveItem(itemPosted) {
        let response
        try {
            console.log(`SaveItemBase.saveItem: started..\n`);
            let result = await this.deleteExistingItem(itemPosted);
            console.log(`SaveItemBase.saveItem: shaping items to process..\n`);
            let items2save = this.getItems2Process(itemPosted)
            console.log(`SaveItemBase.saveItem: saving ${items2save.length} items..\n`);
            response = await (new DbOperations()).processTransaction(items2save);
        } catch (err) {
            throw err
        }
        return response
    }

    async deleteExistingItem(itemPosted) {
        console.log(`SaveItemBase.deleteExistingItem: deleting existing item...\n`);
        let deleteItemKey = {
            orgTenantId: itemPosted.orgTenantId,
            entityId: itemPosted.entityId,
        };
        return (new DeleteItemBase()).deleteItem(deleteItemKey);
    }

    getItems2Process(itemPosted) {
        let items2save = [];

        items2save.push({
            Put: {
                TableName: Utils.getTableName(),
                Item: itemPosted
            }
        });
        if (itemPosted.entityInfo &&
            itemPosted.entityInfo.type &&
            itemPosted.entityInfo.type != "meta" &&
            itemPosted.data &&
            itemPosted.data.length > 0) {
            itemPosted.data.forEach((element, index, array) => {
                let item = {
                    orgTenantId: element.key,
                    entityId: element.value,
                    map: {
                        orgTenantId: itemPosted.orgTenantId,
                        entityId: itemPosted.entityId
                    }
                };
                items2save.push({
                    Put: {
                        TableName: Utils.getTableName(),
                        Item: item
                    }
                });
            });
        }
        return items2save;
    }
}

module.exports = { SaveItemBase }

