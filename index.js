// require('express-async-errors') -> not working
const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const PORT = 3000
const server = app.listen(PORT, () => winston.info(`Listening on port ${PORT}`))

module.exports = server;