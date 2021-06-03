const router = require("express").Router();
const controller = require("../controllers");
const {Auth, hasRole, ROLES} = require('../middlewares/auth')

router.post("/", [Auth, hasRole(ROLES.USER)], controller.basket.createBasket)

router.get("/", [Auth, hasRole(ROLES.USER)], controller.basket.getBasket)

router.delete("/:basketId", [Auth, hasRole(ROLES.USER)], controller.basket.removeBasket)

router.patch("/:basketId", [Auth, hasRole(ROLES.USER)], controller.basket.update)

router.delete("", [Auth, hasRole(ROLES.USER)], controller.basket.clear)

module.exports = router