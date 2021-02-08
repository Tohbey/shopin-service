const router = require("express").Router();
const controller = require("../controllers");

router.post("/",controller.auth.login)

module.exports = router