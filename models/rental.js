const mongoose = require('mongoose')
const Joi = require('joi')

const rentalDBSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255,
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const rentalJoiSchema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
}

const Rental = mongoose.model('Rental', rentalDBSchema);

function validateRental(req) {
    const joiSchema = Joi.object(rentalJoiSchema)
    return joiSchema.validate(req.body)
}

exports.Rental = Rental;
exports.validate = validateRental;
