const router = require("express").Router();
const controller = require("../controllers");

router.get("/users",controller.user.getAllUser)

module.exports = router