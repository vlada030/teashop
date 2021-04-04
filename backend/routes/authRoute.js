const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

const {userRegistration, userLogin, userLogout, getUser, updateUser} = require('../controllers/authenticationController');
const {userIsAuthenticated, userIsNotAuthenticated} = require('../middleware/checkUserAuthentication');
const User = require('../models/userModel');

router.post(
    "/register",
    [
        body("username")
            .not()
            .isEmpty()
            .withMessage("Unesite korisničko ime")
            .isLength({max: 15})
            .withMessage("Korisničko ime može sadržati najviše 15 karaktera")
            .trim(),
        body('email')
            .not()
            .isEmpty()
            .withMessage("Unesite email")
            .bail()
            .isEmail()
            .withMessage('Unesite ispravnu email adresu')
            .bail()
            .custom(async (value) => {
                const user = await User.findOne({ email: value });

                if (user) {
                    throw new Error(
                        "Korisnik sa ovim email-om postoji"
                    );
                }
                return true;
            })
            .normalizeEmail(),
        body('password')
            .not()
            .isEmpty()
            .withMessage('Unesite šifru')
            .isLength({min: 4, max: 15})
            .withMessage('Šifra može sadržati od 4 do 15 karaktera')    
    ],
    userIsAuthenticated,
    userRegistration
);

router.post('/login', userIsAuthenticated, userLogin);

router.delete('/logout', userLogout);

router.get('/getUser', getUser);

router.put('/updateUser',userIsNotAuthenticated, updateUser);

module.exports = router;