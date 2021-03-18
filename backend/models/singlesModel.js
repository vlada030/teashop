const {Schema, model} = require('mongoose');

const SinglesSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        required: [true, 'Unesite naziv proizvoda'],
        lowercase: true,
        trim: true,
        maxlength: [15, 'Naziv može da sadrži najviše 15 karaktera'],
    },

    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Opis proizvoda moze da sadrži najviše 500 karaktera'],
    },

    preparation: {
        type: String,
        trim: true,
        maxlength: [500, 'Priprema moze da sadrži najviše 500 karaktera'],
    },

    goal: {
        type: String,
        trim: true,
        maxlength: [500, 'Dejstvo moze da sadrži najviše 500 karaktera'],
    },

    disclaimer: {
        type: String,
        trim: true,
        maxlength: [500, 'Neželjeno dejstvo moze da sadrži najviše 500 karaktera'],
    },


    price: {
        type: Number,
        required: [true, 'Unesite cenu proizvoda'],
        min: [1, 'Najniža cena proizvoda je 1 RSD'],
        max: [10000, 'Najviša cena proizvoda je 10000 RSD']
    },

    package: {
        type: [String],
        required: [true, 'Unesite veličinu pakovanja'],
        enum: ['100', '50', '30']
    },

    category: {
        type: String,
        required: [true, 'Unesite kategoriju proizvoda'],
        trim: true,
        lowercase: true,
        maxlength: [20, 'Kategorija proizvoda sadrži najviše 20 karaktera']
    },

    stock: {
        type: Number,
        required: [true, 'Unesite količinu na stanju'],
        min: [1, 'Najmanja količina proizvoda je 30gr'],
        max: [10000, 'Najveća količina proizvoda je 10kg']
    },

    stars: {
        type: String,
        trim: true,
        required: [true, 'Unesite prosečnu ocenu'],
    },

    reviews: {
        type: Number,
        required: [true, 'Unesite broj pregleda'],
        min: [1, 'Najmanji broj pregleda je 1'],
        max: [10000, 'Najveći broj pregleda je 10000']
    },

    filter: {
        type: [String],
        trim: true,
        maxlength: [20, 'Filter sadrži najviše 20 karaktera'] 
    },

    images: {
        type: [String],
        trim: true,
        maxlength: [100, 'Link za sliku proizvoda može da sadrži najviše 100 karaktera']
    }
}, {
    timestamps: true
});

module.exports=model('Singles', SinglesSchema);