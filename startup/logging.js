const winston = require('winston')
// require('winston-mongodb')

module.exports = function () {
    process.on('uncaughtException', err => {
        winston.error('Unhandled Crash: ', err)
        process.exit(1)
    })
    process.on('unhandledRejection', err => {
        winston.error('Unhandled Rejection: ', err)
        process.exit(1)
    })

    winston.configure({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.File({ filename: 'logfile.log' }),
            new winston.transports.Console({ format: winston.format.simple() }),
            // new winston.transports.MongoDB({
            //     level:      'error',                            // only log error-level entries here
            //     db:         'mongodb://localhost/vidly',        // your MongoDB connection string
            //     options:    { useUnifiedTopology: true },       // pass mongoose-native options if you like
            //     collection: 'error-logs',                       // collection name to write logs into
            //     tryReconnect: true
            // })
        ]
    });
}
