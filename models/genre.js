const mongoose = require('mongoose')
const Joi = require('joi')


const genreDBSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
const genreJoiSchema = {
    name: Joi.string().min(3).max(50).required()
}

const Genre = mongoose.model('Genre', genreDBSchema);
function validateGenre(req) {
    const joiSchema = Joi.object(genreJoiSchema)
    return joiSchema.validate(req.body)
}

exports.genreDBSchema = genreDBSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

