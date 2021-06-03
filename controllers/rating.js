const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { validateComment, validateRating } = require("../request/rating")
const RatingService = require("../services/rating")


exports.createRating = async(req, res, next) => {
    try {
        req.body.user = req.user._id;
        req.body.product = req.params.productId;

        const { error } = validateRating(req.body)
        if(error) JsonResponse(res, 400, error.details[0].message)

        let createRating = await RatingService.createRating(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createRating)
    } catch (error) {
        next(error)
    }
}


exports.createComment = async(req, res, next) => {
    try {
        req.body.user = req.user._id;
        req.body.product = req.params.productId;

        const { error } = validateComment(req.body)
        if(error) JsonResponse(res, 400, error.details[0].message)

        let createComment = await RatingService.createComment(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createComment)
    } catch (error) {
        next(error)
    }
}


exports.get = async(req, res, next) => {
    try {
        const id = req.params.ratingId;

        const rating = await RatingService.get(id);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, rating)
    } catch (error) {
        next(error)
    }   
}


exports.getProductRating = async(req, res, next) => {
    try {
        const id = req.params.productId;

        const { ratings, total } = await RatingService.getProductRatings(id)

        JsonResponse(res, 200, MSG_TYPES.RATING_RETRIEVED, ratings, total)
    } catch (error) {
        next(error)
    }   
}

exports.delete = async(req, res, next) => {
    try {
        const id = req.params.ratingId;
        const user = req.user._id;

        await RatingService.delete(id, user)

        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)
    }   
}