const { MSG_TYPES } = require('../constant/types');
const SaveItem = require("../models/saveItem");

class SaveItemService{

    static createSavingItem(body){
        return new Promise(async (resolve, reject) => {
            try {
                const saveItem = await SaveItem.findOne({
                    user: body.user,
                    product: body.product
                })
                if(saveItem) {
                    return reject({statusCode:404, msg:MSG_TYPES.EXIST})
                }

                const createSaveItem = await SaveItem.create(body)

                resolve(createSaveItem)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})              
            }
        })
    }

    static getSavingItems(filter, skip, pageSize){
        return new Promise(async (resolve, reject) => {
            try {
                const savedItems = await SaveItem.find(filter)
                .skip(skip).limit(pageSize)

                const total = await SaveItem.find(filter).countDocuments();
                if(total < 0) return reject({statusCode: 200, msg:"No Product is available"})

                resolve({savedItems, total})
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})              
            }
        })
    }

    static removeSavingItem(saveItemId, userId){
        return new Promise(async (resolve, reject) => {
            try {
                const savedItem = await SaveItem.findOne({
                    _id: saveItemId,
                    user: userId,
                });
                if(!savedItem){
                    return reject({statusCode: 404, msg: MSG_TYPES.NOT_FOUND})
                }

                savedItem.delete();

                resolve(savedItem)
            } catch (error) {
                reject({statusCode:500, msg:MSG_TYPES.SERVER_ERROR, error})              
            }
        })
    }

}

module.exports = SaveItemService