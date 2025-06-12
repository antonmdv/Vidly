const mongoose = require('mongoose')
const Joi = require('joi')

const customerDBSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
const customerJoiSchema = {
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required()
}

const Customer = mongoose.model('Customer', customerDBSchema);
function validateCustomer(req) {
    const joiSchema = Joi.object(customerJoiSchema)
    return joiSchema.validate(req.body)
}

exports.Customer = Customer;
exports.validate = validateCustomer;
