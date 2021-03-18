const EnhancedError = require("../utils/enhancedError");

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    //console.log(error);

    if (error.code === 11000) {
        // error.message = 'Uneti e-mail se nalazi u bazi, unesite drugi.';
        // error.statusCode = 400;
        error = new EnhancedError('Uneti e-mail se nalazi u bazi, unesite drugi.', 400);
    }
    
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Greška na serveru'
    });
};

module.exports = errorHandler;
