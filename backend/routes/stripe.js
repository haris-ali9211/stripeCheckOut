const express = require('express')
const Stripe = require("stripe")
const router =express.Router();

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Been bag',
          },
          unit_amount: 21100,
        },
        quantity: 4,
      },
    ],
    
    mode: 'payment',
    success_url: `${process.env.URL_CLIENT}success`,
    cancel_url:  `${process.env.URL_CLIENT}cancel`,
  });

  res.send({
    url: session.url
  });
});

module.exports = router;