const express = require('express')
const Stripe = require("stripe")
const router =express.Router();
const auth = require("../middleware/auth");


require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY_ELBOWROOM)


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


router.post('/createAccountAndLink', async (req,res)=>{

  // Create account ID
  const account = await stripe.accounts.create({
      type: 'express'
  });

  const accountId = account.id;

  // Create account link
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url:`${process.env.URL_CLIENT}success`,
    return_url: `${process.env.URL_CLIENT}cancel`,
    type: 'account_onboarding',
  });

  res.send({
    accountId: accountId,
    url: accountLink.url
  });
})


router.post('/transfer', async(req,res)=>{

  try{
    const transfer = await stripe.transfers.create({
      amount: 1000,
      currency: "cad",
      destination: "acct_1MkFAsGdGLhir5X8",
    });

    res.send({
      data: transfer,
    });
  }
  catch(error){
      console.log("🚀 ~ file: stripe.js:88 ~ router.post ~ error:", error)
  }
})


module.exports = router;