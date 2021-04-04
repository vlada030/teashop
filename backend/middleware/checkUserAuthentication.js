// middleware za proveru da li je user logovan koristeci passport method isAuthenticated
const EnhancedError = require('../utils/enhancedError');

exports.userIsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // return res.status(200).json({
        //     success: true,
        //     message: 'Korisnik je ulogovan.'
        next(new EnhancedError('Zabranjena operacija. Korisnik je već ulogovan.', 400));
    }
    
    next();
}

exports.userIsNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next(new EnhancedError('Zabranjena operacija. Korisnik nije logovan.', 400));
    }
    next();
}