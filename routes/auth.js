//all routers working perfectly 
const router = require("express").Router();
const controller = require("../controllers");
const auth = require('../middlewares/auth')

router.post("/",controller.auth.login)

router.patch("/verify",controller.auth.verify)

router.patch("/resendOtp",controller.auth.resendOtp)

router.patch("/change-password",auth,controller.auth.passwordChange)

module.exports = router