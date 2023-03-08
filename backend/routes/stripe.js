const express = require('express')
const Stripe = require("stripe")
const router =express.Router();

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)


router.post('/create-checkout-session', async (req, res) => {


  // const line_items = req.body.cartItems.map((item) => {
  //   return {
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         name: item.name,
  //         images: [item.image],
  //         description: item.desc,
  //         metadata: {
  //           id: item.id,
  //         },
  //       },
  //       unit_amount: item.price * 100,
  //     },
  //     quantity: item.cartQuantity,
  //   };
  // });


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
    
    phone_number_collection: {
      enabled: true,
    },
    
    mode: 'payment',
    success_url: `${process.env.URL_CLIENT}success`,
    cancel_url:  `${process.env.URL_CLIENT}cancel`,
  });

  
  res.send({
    url: session.url
  });
});


router.post('/checkout', async (req, res) => {
  try {
    // Enable phone number collection during Checkout session creation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.URL_CLIENT}success`,
      cancel_url:  `${process.env.URL_CLIENT}cancel`,
      phone_number_collection: {
        enabled: true,
      },
    });

    // Send verification code to the provided phone number
    const verification = await stripe.verificationSessions.create({
      phone_number: "03012743740",
      type: 'sms',
      amount: 1000,
      currency: 'usd',
      metadata: {
        checkout_session_id: session.id,
      },
    });

    // Retrieve the Checkout session and update its payment status
    const updatedSession = await stripe.checkout.sessions.retrieve(session.id);
    updatedSession.payment_status = 'paid';
    await updatedSession.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during payment processing' });
  }
});

module.exports = router;