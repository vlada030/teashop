const express = require('express');
const { resolve } = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbSessionStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const passport = require('passport');

dotenv.config({path: resolve(__dirname, '../frontend/.env')});
const initializePassport = require('./utils/passportConfig');
const dbConnection = require('./utils/mongoDBConfig');
const EnhancedError = require('./utils/enhancedError');

const productsRoute = require('./routes/productsRoute');
const {createPaymentIntent} = require('./controllers/stripeController');
const {calculateOrderAmount} = require('./middleware/calculateTotals');
const errorHandler = require('./middleware/errorHandler');


// konektuj se na mongoDB
dbConnection();

const app = express();

// inicijalizacija passport autentikacije
initializePassport(passport);

app.use(cors())

// Serve the static files from the React app
// ukoliko je postavljen na HEROKU, NODE_ENV je production i preuzmi build version React app
// u suprotnom startuj loger
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../frontend/build')));
} else {
  app.use(morgan('combined'));
}

app.use(express.json());

// konfigurisanje session store
const sessionStore = new MongoDbSessionStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}))

app.post('/login', (req, res) => {
    
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword
        };

        // ZAPAMTI USERA U MONGODB
        console.log(user);
        
        res.status(200).json({success: true})
    } catch (error) {
        next(new EnhancedError('Greška prilikom registrovanja novog korisnika, pokušajte ponovo', 500))
    }
})

app.use('/allproducts', productsRoute);

// stripe default setup
// pre naplate OBAVEZNO IZVRSITI proracun ukupne suma na server strani
app.post("/create-payment-intent", calculateOrderAmount, createPaymentIntent);

// Handles any requests that don't match the ones above
if (process.env.NODE_ENV === 'production') {
    //console.log('PRODUCTION');
    app.get('*', (req,res) => {
        res.sendFile(resolve(__dirname, '../frontend/build/index.html'));
    });
} else {
    app.get('*', (req,res) => {
     // console.log('DEVELOPMENT');
        res.status(404).json({success: false, message: 'Unknown URL'});
    });
}

// error handler
app.use(errorHandler);

// za development, PORT nije definisan u .env, tako da server koristi 443 (default za https) (moze i 80 - http). Ovo je ubaceno zbog herokua jer on koristi random port definisan preko process.env.PORT na samom serveru
const port = process.env.PORT || 443;

const server = app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.magenta));

// u slucaju da ne mozemo da ostvarimo konekciju,
// ugasi server i izadji iz node aplikacije (process) sa greskom   
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
