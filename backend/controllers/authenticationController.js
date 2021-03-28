const bcrypt = require('bcrypt');
const passport = require('passport');

const EnhancedError = require('../utils/enhancedError');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

// @desc    User Regstration
// @route   POST /registration
// @access  Public

exports.userRegistration = asyncHandler (async (req, res, next) => {
    const { username, email, password } = req.body;
   
    const userCheck = await User.findOne({ email }); 
        
    if (userCheck) {
        return next(new EnhancedError("Korisnik sa unetim e-mailom postoji.", 400));
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    res.status(201).json({success: true, message: 'Kreiran novi korisnik.'});
     
})
// exports.userRegistration = asyncHandler (async (req, res, next) => {
//     const { name, email, password } = req.body;
   
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // ZAPAMTI USERA U MONGODB
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword 
//         });
//         //console.log(user);

//         res.status(200).json({ success: true });
//     })

// @desc    User Login
// @route   POST /login
// @access  Public

exports.userLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) next(err);

        if (!user) {
            return next(new EnhancedError('Pogrešno unet korisnički e-mail ili šifra.', 400));
        }
        
        req.logIn(user, (err) => {

            if (err) next(err);
            //console.log(req.user);
            const filteredeUserData = {
                username: req.user.username,
                favorites: req.user.favorites
            }
            res.status(200).json({success: true, data: filteredeUserData, message: 'Korisnik je uspešno prijavljen.'});
        });
        
      })(req, res, next);
    }
// exports.userLogin = asyncHandler ( (req, res) => {
//         //console.log(req.user);
//         res.status(200).json({ success: true, data: req.user.name });
//     })

// @desc    User Logout
// @route   DELETE /logout
// @access  Public

exports.userLogout = async (req, res, next) => {
    //console.log(req.user);
    if (req.user) {
        req.logOut();
        //console.log(req.session);
        return res.status(200).json({
            success: true,
            message: 'Korisnik je uspešno odjavljen.'
        })        
    }

    next(new EnhancedError('Nema prijavljenog korisnika.', 400))
    
}

// @desc    Get User 
// @route   GET /getUser
// @access  Public

exports.getUser = (req, res, next) => {
    //console.log(req.user);
    if (!req.user) {
        return next(new EnhancedError('Korisnik nije logovan.', 400));
    }
    res.status(200).json({success: true, data: req.user})
}