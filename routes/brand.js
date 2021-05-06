//all routers working perfectly 
const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole, ROLES }  = require("../middlewares/auth")
const { uploadS3 } = require("../utils/index")

router.post("/", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)], uploadS3.single('brand'),controller.brand.createBrand)

router.get("/", Auth ,controller.brand.getBrands)

router.get("/admin/:adminId", Auth ,controller.brand.getBrandsByAdmin)

router.get("/:brandId", Auth, controller.brand.getBrandById)

router.patch("/:brandId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)] ,controller.brand.update)

router.delete("/:brandId", [Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)] ,controller.brand.delete)

module.exports = router