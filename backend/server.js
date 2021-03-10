const express = require('express');
const { join, resolve } = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

dotenv.config({path: resolve(__dirname, '../frontend/.env')});

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();

app.use(cors())

// Serve the static files from the React app
app.use(express.static(resolve(__dirname, '../frontend/build')));

app.use(express.json());

const calculateOrderAmount = (total, cost) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return total + cost;
};

app.post("/create-payment-intent", async (req, res) => {
    const { cart, totalAmount, shipping  } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(totalAmount, shipping),
      currency: "usd"
    });

    //console.log({ cart, totalAmount, shipping  });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  });

if (process.env.NODE_ENV === 'production') {
    // Handles any requests that don't match the ones above
    app.get('*', (req,res) => {
        res.sendFile(resolve(__dirname, '../frontend/build/index.html'));
    });
} else {
    app.get('*', (req,res) => {
        res.status(404).json({success: false, message: 'Unknown URL'});
    });
}

const port = process.env.SERVER_PORT || 5000;

const server = app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.magenta));

// u slucaju da ne mozemo da ostvarimo konekciju,
// ugasi server i izadji iz node aplikacije (process) sa greskom   
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
