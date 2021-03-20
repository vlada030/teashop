const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const getUserByEmail = require('../utils/getUserByEmail');
const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');


const initializePassport = (passport) => {
    // po defaultu prvo ide usernameField, ALI je definisan kao 'email' ispod
    const  verifyCallback = async(email, password, done) => {
            // nasa fja za pronalazenje korisnika na osnovu maila, u zavisnosti sta je storage medium, mongo u ovom slucaju
            try {
                const user = await User.findOne({email}).select('+password');            
            
                //console.log(user);
                if (!user) {
                    // prvi element je error, stavljamo null jer nema greske, nije greska na serveru, false - oznacava da nema korisnika
                    return done(null, false);
                }
        
                // korisnik postoji, proveri sifru
                
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false) 
                }
            } catch (error) {
                // greska u aplikaciji
                return done(error);
            }
        }   

    // defaultne vrednosti za passport LOCAL inpute su 'username' za ime i 'password' za sifru, ukoliko su imena razlicita od ovog mora obde da se navedu
    // npr ako se ide preko form elementa inputi bi po passport defaultu trebali da imaju name property username / password
    const customFields = {
        // usernameField: 'username',
        // passwordField: 'password',
        usernameField: "email",
    }
    
    passport.use(new LocalStrategy(customFields,verifyCallback));

    // upis / ispis passport user id iz sessiona
    // sacuvaj korisnikov id unutar session da znas da je logovan
    passport.serializeUser((user, done) => done(null, user.id))

    // suprotno od fje iznad, na osnovu id cupamo user iz base i OVDE definisemo sta ce biti dodato u req.user
    // passport.deserializeUser((id, done) => {
    //     User.findOne({ _id: id }, (err, user) => {
    //       const userInformation = {
    //         username: user.username,
    //       };
    //       done(err, userInformation);
    //     });
    //   });
    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err))
        })
}

module.exports = initializePassport;