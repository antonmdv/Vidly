const _ = require('lodash')
const {User, validate} = require('../models/user');
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(401).send('Not Found')
    }
    res.send(user)

})

router.post('/', async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(404).send('User already registered!')
    }
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt)
    await user.save()
    const jwtToken = user.generateAuthToken();
    res
        .header('x-auth-token', jwtToken)
        .send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;
