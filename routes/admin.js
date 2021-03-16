//all routers working perfectly 
const router = require("express").Router();
const controller = require("../controllers");
const { Auth, hasRole, ROLES }  = require("../middlewares/auth")

router.post("/",controller.admin.createAdmin)

router.get("",[Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)],controller.admin.getAllAdmin)

router.get("/superAdmin",[Auth, hasRole(ROLES.SUPER_ADMIN)],controller.admin.getAllSuperAdmin)

router.get("/:adminId",[Auth, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN)],controller.admin.getAdmin)

router.patch("/:adminId",Auth,controller.admin.update)

router.patch("/suspend/:adminId",[Auth, hasRole(ROLES.SUPER_ADMIN)],controller.admin.suspendAdmin)

router.patch("/suspend/user/:userId",[Auth, hasRole(ROLES.SUPER_ADMIN)],controller.admin.suspendUser)

router.delete("/", Auth, controller.user.teminateMe)

module.exports = router