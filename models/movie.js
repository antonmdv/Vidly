const mongoose = require('mongoose')
const Joi = require('joi')
const {genreDBSchema} = require('./genre')


const movieDBSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreDBSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    }
});

const movieJoiSchema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
}

const Movie = mongoose.model('Movie', movieDBSchema);
function validateMovie(req) {
    const joiSchema = Joi.object(movieJoiSchema)
    return joiSchema.validate(req.body)
}

exports.Movie = Movie;
exports.validate = validateMovie;

