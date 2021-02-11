const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51IJTUkDLRmlo2iYvbcU4rbdY9gxtFe4bucIQDIujcqF9ilXFrhcJ7urqUaku0TOsTqpxltLMSTZLBaHcyP8P8VKy00FxxberVD");


// API

// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (req, res) => res.status(200).send('hello'))
app.post('/payments/create', async(req, res) => {
  const total = req.query.total; // create?total

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of currency
    currency: 'usd',
  });

  // OK - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  }) 
})

// Listen command
exports.api = functions.https.onRequest(app)

// Example endpoint
// http://localhost:5001/clone-18e27/us-central1/api