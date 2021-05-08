const router = require("express").Router();
const controller = require("../controllers");
const {Auth, hasRole, ROLES} = require('../middlewares/auth')

router.post("/:productId", [Auth, hasRole(ROLES.USER)], controller.rating.createRating)

router.post("/comment/:productId", [Auth, hasRole(ROLES.USER)], controller.rating.createComment)

router.get("/:ratingId",  [Auth, hasRole(ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN)], controller.rating.get)

router.get("/product/:productId", [Auth, hasRole(ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN)], controller.rating.getProductRating)

router.delete("/:ratingId", [Auth, hasRole(ROLES.USER)], controller.rating.delete)

module.exports = router