const router = require("express").Router();
const controller = require("../controllers");
const auth = require('../middlewares/auth')

router.get("/",auth,controller.user.getUser)

router.get("/users",controller.user.getAllUser)

router.post("/",controller.user.createUser)

router.patch("/",auth,controller.user.updateUser)

router.delete("/",auth,controller.user.suspendUser)

module.exports = router