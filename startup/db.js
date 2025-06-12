const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

module.exports = function () {
    // const db = config.get('db')
    // mongoose.connect(db)
    //     .then(() => {
    //         winston.info(`Connected to ${db}...`)
    //     })
    const uri = config.get('db'); // your atlas string, no /vidly
    mongoose.connect(uri, {
        useNewUrlParser:    true,
        useUnifiedTopology: true,
        dbName:             'vidly-Anton'     // <-- explicitly choose the DB
    })
        .then(() => winston.info(`Connected to dbName=vidly-Anton…`));
}