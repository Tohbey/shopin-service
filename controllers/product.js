const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateProduct } = require("../request/product");
const ProductService = require("../services/product")
const BrandService = require("../services/brand")

/** 
 * Create Product
 * @param {*} req
 * @param {*} res
*/
exports.create = async(req, res, next) => {
    try {
        req.body.admin = req.user._id;
        const filter = {
            name: req.body.brand,
            admin: req.body.admin
        }
        const brand = await BrandService.getBrand(filter)
        req.body.brand  = brand._id.toString();

        const assets = await ProductService.getAssets(req.files)
        req.body.assets = assets
        
        const { error } = validateProduct(req.body)
        if(error) JsonResponse(res, 400, error.details[0].message)
        
        let createProduct = await ProductService.create(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createProduct)
    } catch (error) {
        next(error)
    }
}

/** 
 * Get Product
 * @param {*} req
 * @param {*} res
*/
exports.get = async(req, res, next) => {
    try {
        const id = req.params.productId;

        const product = await ProductService.getById(id)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, product)
    } catch (error) {
        next(error)   
    }
}

/** 
 * Get Products
 * @param {*} req
 * @param {*} res
*/
exports.getProducts = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        const filter = {
            brand: req.query.brands
        };

        const {products, total} = await ProductService.getProducts(skip ,pageSize, filter)
       
        const meta ={ 
            total,
            pagination: {pageSize, page}
        }
        
        JsonResponse(res, 200, MSG_TYPES.FETCHED, products, meta)
    } catch (error) {
        next(error)   
    }
}

/** 
 * Products by Admin
 * @param {*} req
 * @param {*} res
*/
exports.getProductsByAdmin = async(req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);
        const filter = {
            admin: req.user_.id,
            brand: req.query.brands
        };

        const {products, total} = await ProductService.getProducts(skip ,pageSize, filter)
       
        const meta ={ 
            total,
            pagination: {pageSize, page}
        }
        
        JsonResponse(res, 200, MSG_TYPES.FETCHED, products, meta)
    } catch (error) {
        next(error)   
    }
}

/** 
 * Delete Product
 * @param {*} req
 * @param {*} res
*/
exports.delete = async(req, res, next) => {
    try {
        const adminId = req.user_.id;
        const productId = req.params.productId;
        
        await ProductService.deleteProduct(productId, adminId)
        
        JsonResponse(res, 200, MSG_TYPES.DELETED)
    } catch (error) {
        next(error)          
    }
}