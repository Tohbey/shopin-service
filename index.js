require("winston-mongodb");
const morgan = require("morgan");
const express = require("express")
const app = express()
app.use(morgan('tiny'))
const winston = require("winston");

require("./startup/routes")(app);
require("./startup/db")()
require('./startup/prod')(app);

app.get("",async(req, res) => {
    res.send({
        title:"Welcome to Shopin-api",
        developer:"Fafowora Oluwatobiloba"
    })
})

app.listen(3000, () => {
    winston.info("----project is up and running--------")
})

