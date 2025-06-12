const _ = require('lodash')
const {User} = require('../models/user');
const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const router = express.Router()


router.post('/', async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Invalid email.')
    }

    let isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) {
        return res.status(400).send('Invalid password.')
    }
    const jwtToken = user.generateAuthToken();
    return res.send(jwtToken);
})

function validate(req) {
    const joiSchema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
    })
    return joiSchema.validate(req.body)
}

module.exports = router;
