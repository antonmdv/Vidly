const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('Please provide a customer id')
    if (!req.body.movieId) return res.status(400).send('Please provide a modie id')

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId,
    })
    if (!rental) return res.status(400).send('Rental not found.')

    if (rental.dateReturned) {
        return res.status(400).send('Rental already returned.')
    }

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({_id: rental.move.id}, {
        $inc: {numberInStock: 1}
    });

    return res.status(200).send(rental);
})

module.exports = router
