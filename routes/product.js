const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole, ROLES }  = require("../middlewares/auth")
const { uploadS3 } = require("../utils/index")

router.post("/", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)], uploadS3.array("image", 5), controller.product.create)

router.get("/:productId", [Auth], controller.product.get)

router.get("", [Auth],controller.product.getProducts)

router.get("/byAdmin", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)],controller.product.getProductsByAdmin)

router.delete(":/productId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)], controller.product.delete)

module.exports = router