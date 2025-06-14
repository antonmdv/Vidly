const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()
const auth = require('../middleware/auth')


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(404).send('No customer found.')

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(404).send('No movie found.')

    if (movie.numberInStock === 0) return res.status(404).send('Movie not in stock.')
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    rental.save()
    movie.numberInStock--;
    movie.save()
    // TODO: FAWN module conflict due to versioning, keeping it as two db transactions
    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', {_id: movie.id},
    //             {$inc: {numberInStock: -1}})
    //         .run()
    // } catch (error) {
    //     res.status(500).send('Something went wrong.');
    // }
    res.send(rental);
})

module.exports = router
