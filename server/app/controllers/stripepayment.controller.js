const config = require("../config/auth.config");
const db = require("../models");
const express = require("express");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 
var {ObjectId} = require('mongodb');

const stripe = require('stripe')('sk_test_key')
const app = express();
app.use(express.static('public'));
//const YOUR_DOMAIN = 'http://localhost:3000';
const YOUR_DOMAIN = 'projectclone.mywire.org';

exports.payment = async (req, res) => { 
 
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  /*stripe.charges.create({
    card:  req.body.cardtoken,
    currency: 'usd',
    amount: req.body.amount*100
  }, (err, charge) => {
    if (err) {
      console.log('here');
      // console.log(err);
      res.send('error');
    } else {
      res.send('success');
    }

  });*/

};




 

 