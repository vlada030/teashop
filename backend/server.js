const express = require('express');
const { join, resolve } = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config({path: resolve(__dirname, '../frontend/.env')});

const dbConnection = require('./utils/mongoDB');

const productsRoute = require('./routes/productsRoute');
const {createPaymentIntent} = require('./controllers/stripeController');
const {calculateOrderAmount} = require('./middleware/calculateTotals');
const errorHandler = require('./middleware/errorHandler');

// konektuj se na mongoDB
dbConnection();

const app = express();

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Serve the static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../frontend/build')));
}

app.use(express.json());

app.use('/products', productsRoute);

// stripe default setup
// pre naplate OBAVEZNO IZVRSITI proracun ukupne suma na server strani
app.post("/create-payment-intent", calculateOrderAmount, createPaymentIntent);

if (process.env.NODE_ENV === 'production') {
    // Handles any requests that don't match the ones above
    console.log('PRODUCTION');
    app.get('*', (req,res) => {
        res.sendFile(resolve(__dirname, '../frontend/build/index.html'));
    });
} else {
    app.get('*', (req,res) => {
      console.log('DEVELOPMENT');
        res.status(404).json({success: false, message: 'Unknown URL'});
    });
}

// error handler
app.use(errorHandler);

const port = process.env.SERVER_PORT || 5000;

const server = app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.magenta));

// u slucaju da ne mozemo da ostvarimo konekciju,
// ugasi server i izadji iz node aplikacije (process) sa greskom   
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
