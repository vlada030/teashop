const express = require('express');
const { resolve } = require('path');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbSessionStore = require('connect-mongodb-session')(session);
const passport = require('passport');
require('dotenv').config({path: resolve(__dirname, '../frontend/.env')});

const initializePassport = require('./utils/passportConfig');
const dbConnection = require('./utils/mongoDBConfig');

const productsRoute = require('./routes/productsRoute');
const authRouter = require('./routes/authRoute');

const {createPaymentIntent} = require('./controllers/stripeController');

const {calculateOrderAmount} = require('./middleware/calculateTotals');
const errorHandler = require('./middleware/errorHandler');


// konektuj se na mongoDB
dbConnection();

const app = express();

// inicijalizacija passport autentikacije
initializePassport(passport);
// preusmeravanje na default react port 3000, credentials OBAVEZNO zbog cookie
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Serve the static files from the React app
// ukoliko je postavljen na HEROKU, NODE_ENV je production i preuzmi build version React app
// u suprotnom startuj loger
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../frontend/build')));
} else {
  app.use(morgan('dev'));
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
        //maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}))

if (process.env.NODE_ENV === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    //session.cookie.secure = true;
    app.use(session({  
        cookie: {
            secure: true
        },
        
    }))
    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
  }

// pozivanje paspport
app.use(passport.initialize());
app.use(passport.session())

// proveri session i usera
// app.use((req, res, next) => {
//     console.log(req.session);
//     console.log(req.user);
//     next();
// })

app.use('/auth', authRouter);

app.use('/allproducts', productsRoute);

// stripe default setup
// pre naplate OBAVEZNO IZVRSITI proracun ukupne suma na server strani
app.post("/create-payment-intent", calculateOrderAmount, createPaymentIntent);

// ZA TESTIRANJE
// app.get('/error', (req, res) => {
//     res.status(500).json({success: false, message: 'PASSPORT GRESKA'})
// })

// Handles any requests that don't match the ones above
if (process.env.NODE_ENV === 'production') {
    //console.log('PRODUCTION');
    app.get('*', (req, res) => {
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
