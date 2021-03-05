//all routers working perfectly 
const router = require("express").Router();
const controller = require("../controllers");
const auth = require('../middlewares/auth')

router.get("/",auth,controller.user.getAllUser)

router.get("/me",auth,controller.user.getMe)

router.get("/:id",auth,controller.user.getUser)

router.post("/",controller.user.createUser)

router.patch("/",auth,controller.user.updateUser)

router.delete("/me",auth,controller.user.teminateMe)

module.exports = router