const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateBasket } = require("../request/basket")
const BasketService = require("../services/basket");

exports.createBasket = async(req, res, next) => {
    try {
        req.body.user = req.user._id;

        const { error } = validateBasket(req.body)
        if(error) JsonResponse(res, 400, error.details[0].message)

        let createBasket = await BasketService.create(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createBasket)
    } catch (error) {
        next(error)
    }
}

exports.getBasket = async(req, res, next) => {
    try {
        const user = req.user._id;

        const basket = await BasketService.get(user)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, basket)
    } catch (error) {
        next(error)
    }
}

exports.removeBasket = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const basketId = req.params.basketId;

        const basket = await BasketService.removeBasket(userId, basketId)

        JsonResponse(res, 200, MSG_TYPES.DELETED, basket)
    } catch (error) {
        next(error)
    }
}


exports.checkOut = async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

exports.update = async(req, res, next) => {
    try {
        const basketId = req.params.basketId;
        const user = req.user._id;

        await BasketService.update(req.body,basketId, user)
        
        return JsonResponse(res, 200, MSG_TYPES.UPDATED)
    } catch (error) {
        next(error)
    }
}

exports.clear = async(req, res, next) => {
    try{
        const user = req.user._id;

        await BasketService.clearBasket(user);

        return JsonResponse(res, 200, MSG_TYPES.DELETED)
    }catch(error){
        next(error)
    }
}