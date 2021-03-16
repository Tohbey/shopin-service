const express = require('express')
const users = require("../routes/user")
const address = require("../routes/address")
const admin = require("../routes/admin")
const brand = require("../routes/brand")
const auth = require("../routes/auth")

module.exports = function(app){
    app.use(express.json());
    app.use("/user",users);
    app.use("/auth",auth);
    app.use("/admin",admin)
    app.use("/address",address);
    app.use("/brand",brand)
}