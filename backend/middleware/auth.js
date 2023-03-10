const express = require('express')
const Stripe = require("stripe")
const router = express.Router();

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY_ELBOWROOM)


router.post('/accountCreate', async (req, res) => {
    const account = await stripe.accounts.create({
        type: 'express'
    });

    res.send({
        id: account.id
    });

})

module.exports = router;