const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateBrand } = require("../request/brand");
const BrandService = require("../services/brand");


exports.createBrand = async(req, res, next) => {
    try {
        req.body.admin = req.user._id;
        const { error } = validateBrand(req.body)
        if(error) return JsonResponse(ress, 400, error.details[0].message)

        req.body.img = req.file.location

        let createBrand = await BrandService.create(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createBrand)
    } catch (error) {
        next(error)
    }
}

exports.getBrands = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        const filter = {};

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

exports.getBrandsByAdmin = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        const filter = {
            admin: req.params.adminId
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

exports.getBrandById = async(req, res, next) => {
    try {
        const filter = {
            _id: req.params.brandId
        };

        const brand = await BrandService.getBrand(filter)

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