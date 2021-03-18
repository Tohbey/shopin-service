const mongoose = require('mongoose')
const winston = require('winston')
require('dotenv').config()

const dbURL = process.env.MONGO_URL


module.exports = function(){
    mongoose.connect(dbURL,{
       useFindAndModify: false
    })
    .then(() => winston.info('-------Successfully connected to MongoDB-------'))
}