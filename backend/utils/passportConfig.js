const LocalStrategy = require('passport-local').Strategy;
const bcript = require('bcrypt');

const initializePassport = (passport) => {
    const authenticateUser = async(email, password, done) => {
        // nasa fja za pronalazenje korisnika na osnovu maila, u zavisnosti sta je storage medium
        const user = getUserByEmail(email);
        if (user === null) {
            // prvi element je error, stavljamo null jernema greske, nije greska na serveru, false - nema korisnika
            return done(null, false, {messsage: 'Ne postoji korisnik sa tim e-mailom'})
        }

        // korisnik postoji, proveri sifru
        try {
            if (await bcript.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Uneli ste pogrešnu šifru'}) 
            }
        } catch (error) {
            
        }
    };

    passport.use(new LocalStrategy({
        // // defaultne vrednosti
        // usernameField: 'name',
        // passwordField: 'password',
        usernameField: 'email'
    }, authenticateUser))
    // sacuvaj korisnika unutar session
    passport.serializeUser((user, done) => {})

    // suprtono od fje iznad, imamo id jer se user serializuje kao single id
    passport.deserializeUser((id, done) => {})

}

module.exports = initializePassport;