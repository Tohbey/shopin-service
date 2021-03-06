const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole }  = require("../middlewares/auth")

router.post("/",controller.admin.createAdmin)

router.get("",[Auth, hasRole("Admin")],controller.admin.getAllAdmin)

router.get("/:id",[Auth, hasRole("Admin")],controller.admin.getAdmin)

router.get("/me",Auth,controller.admin.getMe)

router.patch("/",Auth,controller.admin.update)

router.patch("/suspend/:id",[Auth, hasRole("SuperAdmin")],controller.admin.suspendAdmin)

router.patch("/suspend/user/:userId",[Auth, hasRole("Admin")],controller.user.suspendUser)

router.delete("/", Auth, controller.user.teminateMe)

module.exports = router