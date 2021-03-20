const LocalStrategy = require('passport-local').Strategy;
const bcript = require('bcrypt');
//const getUserByEmail = require('../utils/getUserByEmail');
const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');


const initializePassport = (passport) => {
    const authenticateUser = async(email, password, done) => {
            // nasa fja za pronalazenje korisnika na osnovu maila, u zavisnosti sta je storage medium, mongo u ovom slucaju
            try {
                const user = await User.findOne({email}).select('+password');            
            
                //console.log(user);
                if (!user) {
                    // prvi element je error, stavljamo null jer nema greske, nije greska na serveru, false - oznacava da nema korisnika
                    return done(null, false);
                }
        
                // korisnik postoji, proveri sifru
                
                if (await bcript.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false) 
                }
            } catch (error) {
                // greska u aplikaciji
                return done(error);
            }
        }        

    passport.use(new LocalStrategy({
        // // defaultne vrednosti
        // usernameField: 'name',
        // passwordField: 'password',
        usernameField: 'email'
    }, authenticateUser));

    // sacuvaj korisnikov id unutar session
    passport.serializeUser((user, done) => done(null, user.id))

    const getUserById = async (id) => {
        const user = await User.findById(id);
        return {username: user.username};
    };
    // suprotno od fje iznad, imamo id jer se user serializuje kao single id
    //passport.deserializeUser((id, done) => done(null, getUserById(id)))
    // passport.deserializeUser((id, done) => done(null, async (id) => {
    //     const user = await User.findById(id);
    //     return {username: user.username};
    // }))
    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
          const userInformation = {
            username: user.username,
          };
          done(err, userInformation);
        });
      });
}

module.exports = initializePassport;