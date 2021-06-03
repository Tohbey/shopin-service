const express = require('express');
const users = require("../routes/user");
const address = require("../routes/address");
const admin = require("../routes/admin");
const brand = require("../routes/brand");
const product = require("../routes/product");
const auth = require("../routes/auth");
const basket = require("../routes/basket");
const rating = require("../routes/rating");
const saveItem = require("../routes/saveItem");

module.exports = function(app){
    app.use(express.json());
    app.use("/user", users);
    app.use("/auth", auth);
    app.use("/admin", admin);
    app.use("/address", address);
    app.use("/brand", brand);
    app.use("/product", product);
    app.use("/basket", basket);
    app.use("/rating", rating);
    app.use("/saveitem", saveItem);
}