const LocalStrategy = require('passport-local').Strategy;
const bcript = require('bcrypt');
//const getUserByEmail = require('../utils/getUserByEmail');
const User = require('../models/userModel');
const EnhancedError = require('../utils/enhancedError');


const initializePassport = (passport) => {
    const authenticateUser = async(email, password, done) => {
        // nasa fja za pronalazenje korisnika na osnovu maila, u zavisnosti sta je storage medium
        const user = await User.findOne({email}).select('+password');
        //console.log(user);
        if (user === null) {
            // prvi element je error, stavljamo null jer nema greske, nije greska na serveru, false - oznacava da nema korisnika
            return done(new EnhancedError('Ne postoji korisnik sa tim e-mailom.', 400), false);
        }

        // korisnik postoji, proveri sifru
        try {
            if (await bcript.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(new EnhancedError('Uneli ste pogrešnu šifru.', 400), false) 
            }
        } catch (error) {
            // greska u aplikaciji
            return done(error);
        }
    };

    passport.use(new LocalStrategy({
        // // defaultne vrednosti
        // usernameField: 'name',
        // passwordField: 'password',
        usernameField: 'email'
    }, authenticateUser));
    // sacuvaj korisnikov id unutar session
    passport.serializeUser((user, done) => done(null, user.id))

    const getUserById = async (id) => {return await User.findById(user.id)};
    // suprotno od fje iznad, imamo id jer se user serializuje kao single id
    passport.deserializeUser((id, done) =>  done(null, getUserById(id)))
}

module.exports = initializePassport;