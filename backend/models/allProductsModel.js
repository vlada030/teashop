const mongoose = require('mongoose');

const AllProductsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        required: [true, 'Unesite naziv proizvoda'],
        trim: true,
        maxlength: [15, 'Naziv moze da sadrži najviše 15 karaktera'],
    },

    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Opis proizvoda moze da sadrži najviše 500 karaktera'],
    },

    price: {
        type: Number,
        required: [true, 'Unesite cenu proizvoda'],
        min: [1, 'Najniža cena proizvoda je 1 RSD'],
        max: [10000, 'Najviša cena proizvoda je 10000 RSD']
    },

    package: {
        type: String,
        required: [true, 'Unesite veličinu pakovanja'],
        enum: ['100', '50', '30']
    },

    category: {
        type: String,
        trim: true,
        maxlength: [20, 'Kategorija proizvoda sadrži najviše 20 karaktera'],
    },

    filter: {
        type: String
    },

    image: {
        type: String,
        trim: true,
        maxlength: [100, 'Link za sliku proizvoda može da sadrži najviše 100 karaktera']
    }

});

module.exports=mongoose.model('AllProducts', AllProductsSchema);