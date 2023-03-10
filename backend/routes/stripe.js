const express = require('express')
const Stripe = require("stripe")
const router =express.Router();
const auth = require("../middleware/auth");


require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY_ELBOWROOM)


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

router.post('/CreateAccountId', async (req, res) => {
  const account = await stripe.accounts.create({
      type: 'express'
  });

  res.send({
      id: account.id
  });

})

module.exports = router;


router.post('/accountCreate', async (req,res)=>{

  const accountLink = await stripe.accountLinks.create({
    account: "acct_1MkE5x2eLekgtK2a",
    refresh_url:`${process.env.URL_CLIENT}success`,
    return_url: `${process.env.URL_CLIENT}cancel`,
    type: 'account_onboarding',
  });

  res.send({
    url: accountLink.url
  });

})



module.exports = router;