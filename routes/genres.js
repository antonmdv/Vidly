const {Genre, validate} = require('../models/genre');
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const asyncHandler = require('../middleware/async')
const validateObjectId = require('../middleware/validateObjectId')


// Send all genres
router.get('/', asyncHandler(async (req, res) => {
    console.log(req.query)
    const genres = await Genre.find().sort('name');
    res.send(genres);
}))

// Send single genre
router.get('/:genreId', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.genreId).select('name')
    if (!genre) return res.status(404).send('No such genre')
    res.send(genre);
})

// Create new genre
router.post('/', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        name: req.body.name
    })
    genre = await genre.save();
    res.send(genre);
})

router.put('/:genreId', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = await Genre.findByIdAndUpdate(req.params.genreId,
        {
            name: req.body.name,
        }, { new: true })
    if (!genre) return res.status(404).send('No such genre')
    res.send(genre);
})

router.delete('/:genreId', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.genreId)
    if (!genre) return res.status(404).send('No such genre')
    res.send(genre);
})

module.exports = router
