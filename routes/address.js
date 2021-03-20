//all routers working perfectly 
const router = require("express").Router();
const controller = require("../controllers");
const {Auth} = require('../middlewares/auth')

router.post("/", Auth, controller.address.createAddress)

router.get("/", Auth, controller.address.getDefault)

router.get("/all", Auth, controller.address.getAllAddress)

router.get("/:address", Auth, controller.address.getAddress)

router.patch("/default/:addressId", Auth, controller.address.setDefault)

router.patch("/:addressId", Auth, controller.address.updateAddress)

router.delete("/:addressId", Auth, controller.address.deleteAddress)

module.exports = router
