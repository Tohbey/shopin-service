const router = require("express").Router();
const controller = require("../controllers");
const auth = require('../middlewares/auth')

router.get("/:address",auth,controller.address.getAddress)

router.get("/byUser",auth,controller.address.getAllAddress)

router.post("/",auth,controller.address.createAddress)

router.put("/:addressId",auth,controller.address.updateAddress)

router.delete("/:addressId",auth,controller.address.deleteAddress)

module.exports = router
