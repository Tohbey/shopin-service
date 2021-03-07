const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole, ROLES }  = require("../middlewares/auth")

router.post("/", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)] ,controller.brand.createBrand)

router.get("/", Auth ,controller.brand.getBrands)

router.get("/:brandId", Auth, controller.brand.getBrand)

router.patch("/:brandId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)] ,controller.brand.update)

router.delete("/:brandId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)] ,controller.brand.delete)

module.exports = router