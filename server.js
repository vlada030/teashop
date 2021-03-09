const express = require('express');
const { join } = require('path');
const dotenv = require('dotenv');

dotenv.config({path: join(__dirname, 'frontend/.env')});

const app = express();

// Serve the static files from the React app
app.use(express.static(join(__dirname, 'frontend/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) => {
    res.sendFile(join(__dirname, 'frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);