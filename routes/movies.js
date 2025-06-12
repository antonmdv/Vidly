const {Movie, validate} = require('../models/movie');
const express = require('express')
const {Genre} = require("../models/genre");
const router = express.Router()
const auth = require('../middleware/auth')



router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

router.get('/:movieId', async (req, res) => {
    const movie = await Movie.findById(req.params.movieId)
    if (!movie) return res.status(404).send('No such movie')
    res.send(movie);
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    // console.log('Hello from api:', req)
    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send('No such genre')

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.send(movie);
})

router.put('/:movieId', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');


    const movie = await Movie.findByIdAndUpdate(req.params.movieId,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        }, { new: true })
    if (!movie) return res.status(404).send('No such movie')
    res.send(movie);
})

router.delete('/:movieId', auth,async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.movieId)
    if (!movie) return res.status(404).send('No such movie')
    res.send(genre);
})

module.exports = router
