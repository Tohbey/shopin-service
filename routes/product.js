const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole, ROLES }  = require("../middlewares/auth")
const { uploadFiles } = require("../utils/index")

router.post("/", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)], uploadFiles.single('productImage'), controller.product.create)

router.get("/:productId", [Auth], controller.product.get)

router.get("", [Auth],controller.product.getProducts)

router.get("/byAdmin", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)],controller.product.getProductsByAdmin)

router.delete(":/productId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)], controller.product.delete)

module.exports = router