require("winston-mongodb");
const morgan = require("morgan");
const express = require("express")
const cors = require('cors')
const winston = require("winston");

const app = express()
app.use(morgan('tiny'))
app.use(cors())

require("./startup/routes")(app);
require("./startup/db")()
require('./startup/prod')(app);

app.get("",async(req, res) => {
    res.send({
        title:"Welcome to Shopin-api",
        developer:"Fafowora Oluwatobiloba Kayode",
        github: "https://github.com/Tohbey",
        twitter: "",
        documentationURL: ""
    })
})

app.listen(3000, () => {
    winston.info("----project is up and running--------")
})

