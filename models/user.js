const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require("jsonwebtoken");
const config = require("config");

const userDBSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
    }
});

userDBSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const userJoiSchema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
}

const User = mongoose.model('User', userDBSchema);
function validateUser(req) {
    const joiSchema = Joi.object(userJoiSchema)
    return joiSchema.validate(req.body)
}

exports.User = User;
exports.validate = validateUser;
