const jwt = require('jsonwebtoken')
const config = require('config')

// Auth middleware
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).send('Bad Request. Invalid token.');
    }
}
