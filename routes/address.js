const router = require("express").Router();
const controller = require("../controllers");
const {Auth} = require('../middlewares/auth')

router.get("/:address",Auth,controller.address.getAddress)

router.get("/byUser",Auth,controller.address.getAllAddress)

router.post("/",Auth,controller.address.createAddress)

router.put("/:addressId",Auth,controller.address.updateAddress)

router.delete("/:addressId",Auth,controller.address.deleteAddress)

module.exports = router
