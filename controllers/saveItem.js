const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const SaveItemService = require('../services/saveItem');
const { validateSaveItem } = require('../request/saveItem');
const { paginate } = require("../utils/index");

/** 
 * Create Save Item
 * @param {*} req
 * @param {*} res
*/
exports.createSaveItem = async(req, res, next) => {
    try {
        req.body.user = req.user._id;
        req.body.product = req.params.productId;

        const { error } = validateSaveItem(req.body)
        if(error) JsonResponse(res, 400, error.details[0].message)

        let createSaveItem = await SaveItemService.createSaveItem()

        JsonResponse(res, 201, MSG_TYPES.CREATED, createSaveItem)
    } catch (error) {
        next(error)
    }
}


/** 
 * Get Save Item
 * @param {*} req
 * @param {*} res
*/
exports.getSaveItems = async(req, res, next) => {
    try {
        const id = req.user._id;
        const filter = {
            userId: id
        };
        const { page, pageSize, skip } = paginate(req)

        const {savedItems, total } = await SaveItemService.getSavingItems(filter, skip, pageSize)

        const meta = {
            total,
            paginate:{pageSize, page}
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, savedItems, meta)
    } catch (error) {
        next(error)
    }
}

/** 
 * Delete Save Item
 * @param {*} req
 * @param {*} res
*/
exports.deleteSaveItem = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const saveItemId = req.params.saveItemId;

        await SaveItemService.removeSavingItem(saveItemId, userId)

        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)
    }
}