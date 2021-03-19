const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Unesite korisničko ime'],
        maxlength: [15, 'Korisničko ime može da sadrži najviše 15 karaktera'],
    }, 

    email: {
        type: String,
        trim: true,
        required: [true, "Unesite e-mail"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Pogrešan format email adrese'],
        unique: true
    },
    // sifra je vec heshovana zato 'ne radi' minLength
    password: {
        type: String,  
        trim: true,
        required: [true, 'Unesite šifru'],
        minLength: 7,
        select: false
    },

    cart: {
        type: [String],
        default: []
    }
    },

    {timestamps: true}
    );

    module.exports = model('User', UserSchema);