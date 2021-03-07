const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateBrand } = require("../request/brand");
const BrandService = require("../services/brand");


exports.createBrand = async(req, res, next) => {
    try {
        const { error } = validateBrand(req.body)
        if(error) return JsonResponse(ress, 400, error.details[0].message)

        let createBrand = await BrandService.create(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createBrand)
    } catch (error) {
        next(error)
    }
}

exports.getBrands = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        const filter = {
            user: req.user._id
        };

        const { brands, total } = await BrandService.getBrands(skip, pageSize, filter);

        const meta ={ 
            total,
            pagination: {pageSize, page}
        }

        JsonResponse(res, 201, MSG_TYPES.FETCHED, brands, meta)
    } catch (error) {
        next(error)
    }
}

exports.getBrand = async(req, res, next) => {
    try {
        const brandId = req.params.brandId;

        const brand = await BrandService.getBrand(brandId)

        JsonResponse(res, 201, MSG_TYPES.FETCHED, brand)
    } catch (error) {
        next(error)
    }
}

exports.update = async(req, res, next) => {
    try {
        const brandId = req.params.brandId;
        const user = req.user._id;

        await BrandService.update(brandId, req.body, user);

        return JsonResponse(res, 200, MSG_TYPES.UPDATED);
    } catch (error) {
        next(error)
    }
}

exports.delete = async(req, res, next) => {
    try {
        const brandId = req.params.brandId;
        const user = req.user._id;

        await BrandService.delete(brandId, user);

        return JsonResponse(res, 200, MSG_TYPES.DELETED);
    } catch (error) {
        next(error)
    }
}