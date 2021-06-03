const router = require("express").Router();
const controller = require("../controllers");
const {Auth, hasRole, ROLES} = require('../middlewares/auth')

router.post("/:productId", [Auth, hasRole(ROLES.USER)], controller.saveItem.createSaveItem)

router.get("/", [Auth, hasRole(ROLES.USER)], controller.saveItem.getSaveItems)

router.delete("/:saveItemId", [Auth, hasRole(ROLES.USER)], controller.saveItem.deleteSaveItem)

module.exports = router