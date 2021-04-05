// middleware za proveru da li je user logovan koristeci passport method isAuthenticated
const EnhancedError = require('../utils/enhancedError');

exports.userIsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // return res.status(200).json({
        //     success: true,
        //     message: 'Korisnik je ulogovan.'
        return next(new EnhancedError('Zabranjena operacija. Korisnik je već ulogovan.', 400));
    }
    
    next();
}

exports.userIsNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new EnhancedError('Zabranjena operacija. Korisnik nije logovan.', 401));
    }
    next();
}

exports.isUserAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }

    next(new EnhancedError('Zabranjena operacija. Korisnik nema autorizaciju da pristupi ruti.', 403));
}