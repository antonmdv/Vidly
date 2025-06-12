const { Customer, validate } = require('../models/customer')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// Send all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

// Send single customer
router.get('/:customerId', async (req, res) => {
    const customer = await Customer.findById(req.params.customerId)
    if (!customer) return res.status(404).send('No such genre')
    res.send(customer);
})

// Create new customer
router.post('/', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    })
    customer = await customer.save();
    res.send(customer);
})

// Update Customer
router.put('/:customerId', auth, async (req, res) => {
    const { error } = validate(req)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.customerId,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        }, { new: true })
    if (!customer) return res.status(404).send('No such genre')
    res.send(customer);
})

// Delete Customer
router.delete('/:customerId', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.customerId)
    if (!customer) return res.status(404).send('No such genre')
    res.send(customer);
})

module.exports = router
