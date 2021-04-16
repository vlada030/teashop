const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const Singles = require('../models/singlesModel');

const {allProducts, singleProduct, createProduct, updateProduct, patchProduct} = require('../controllers/productsController');
const {userIsNotAuthenticated, isUserAdmin} = require('../middleware/checkUserAuthentication');

router.route('/').get(allProducts);

router.route("/create-product")
    .post(userIsNotAuthenticated, isUserAdmin,
        [
            body("id")
                .trim()
                .isLength({min:5, max: 5})
                .withMessage("Šifra proizvoda treba da sadrži 5 broja")
                .bail()
                .custom(async (value) => {
                    const product = await Singles.findOne({ id: value });

                    if (product) {
                        throw new Error(
                            `Proizvod sa šifrom ${value} postoji`
                        );
                    }
                    return true;
                }),
            body('name', 'Polje NAZIV može da sadrži najviše 15 karaktera i ne sme da bude prazno polje')
                .not()
                .isEmpty()
                .isLength({max: 15})
                .trim()
                .toLowerCase(),
            body('description', 'Polje OPIS može da sadrži najviše 1000 karaktera')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('preparation', 'Polje PRIPREMA može da sadrži najviše 1000 karaktera')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('goal', 'Polje DEJSTVO može da sadrži najviše 1000 karaktera')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('disclaimer', 'Polje NEZELJENA DEJSTVA može da sadrži najviše 1000 karaktera')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('price')
                .isNumeric()
                .withMessage('Polje CENA ima format broja')
                .custom(value => {
                    if (value < 1) {
                        throw new Error('Najniža cena proizvoda je 1 RSD')
                    } 

                    if (value > 10000) {
                        throw new Error('Najviša cena proizvoda je 10.000 RSD')
                    } 

                    return true;
                }),
            body('stock')
                .isNumeric()
                .withMessage('Polje STANJE je kolicina proizvoda na stanju u gramima')
                .custom(value => {
                    if (value < 30) {
                        throw new Error('Najmanja količina proizvoda je 30 gr')
                    } 

                    if (value > 10000) {
                        throw new Error('Najveća količina proizvoda je 10 000 gr')
                    } 

                    return true;
                }),
            body('category', 'Polje Kategorija ne sme da bude prazno i max 15 karaktera')
                .not()
                .isEmpty()
                .isLength({max: 15})
                .trim()
                .toLowerCase(),
            body('package', 'Dostupne jedinice su Array sa 0 - 3 elementa')
                .isArray({
                    min: 0,
                    max: 3
                }),
            body('featured', 'Featured propertie je tipa boolean')
                .isBoolean(),
            body('stars', 'Ocena proizvoda ima vrednost 0.0 - 5.0')
                .custom(value => {
                    if (value < 0) {
                        throw new Error('Najniža ocena proizvoda je 0.0')
                    } 

                    if (value > 5) {
                        throw new Error('Najveća ocena proizvoda je 5.0')
                    } 

                    return true;
                }),
            body('reviews', 'Broj pregleda je celobrojna vrednost između 1 - 2000')
                .isNumeric()
                .custom(value => {
                    if (value < 1) {
                        throw new Error('Najniži broj pregleda je 1')
                    } 

                    if (value > 2000) {
                        throw new Error('Najviši broj pregleda je 2 000')
                    } 

                    return true;
                }),
            body('filter', 'Polje Ključne Reči je tipa Array')
                .isArray(),
            body('images', 'Polje Linkovi Slika je tipa Array')
                .isArray(),
            ], createProduct);

router.route('/:id')
    .get(singleProduct)
    .put(
        userIsNotAuthenticated, 
        isUserAdmin,
        [
            body("id")
                .isLength({min:5, max: 5})
                .withMessage("Šifra proizvoda treba da sadrži 5 broja.")
                .trim(),
            body('name', 'Polje NAZIV može da sadrži najviše 15 karaktera i ne sme da bude prazno polje.')
                .not()
                .isEmpty()
                .isLength({max: 15})
                .trim()
                .toLowerCase(),
            body('description', 'Polje OPIS može da sadrži najviše 1000 karaktera.')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('preparation', 'Polje PRIPREMA može da sadrži najviše 1000 karaktera.')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('goal', 'Polje DEJSTVO može da sadrži najviše 1000 karaktera.')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('disclaimer', 'Polje NEZELJENA DEJSTVA može da sadrži najviše 1000 karaktera.')
                .isLength({max: 1000})
                .trim()
                .toLowerCase(),
            body('price')
                .isNumeric()
                .withMessage('Polje CENA ima format broja.')
                .custom(async(value) => {
                    if (value < 1) {
                        throw new Error('Najniža cena proizvoda je 1 RSD')
                    } 

                    if (value > 10000) {
                        throw new Error('Najviša cena proizvoda je 10.000 RSD')
                    } 

                    return true;
                }),
            body('stock')
                .isNumeric()
                .withMessage('Polje STANJE je kolicina proizvoda na stanju u gramima.')
                .custom(async(value) => {
                    if (value < 0) {
                        throw new Error('Najmanja količina proizvoda je 0 gr')
                    } 

                    if (value > 10000) {
                        throw new Error('Najveća količina proizvoda je 10 000 gr')
                    } 

                    return true;
                }),
            body('category', 'Polje Kategorija ne sme da bude prazno i max 15 karaktera')
                .not()
                .isEmpty()
                .isLength({max: 15})
                .trim()
                .toLowerCase(),
            body('package', 'Dostupne jedinice su Array sa 0 - 3 elementa')
                .isArray({
                    min: 0,
                    max: 3
                }),
            body('featured', 'Featured propertie je tipa boolean')
                .isBoolean(),
            body('stars', 'Ocena proizvoda ima vrednost 0.0 - 5.0')
                .custom(value => {
                    if (value < 0) {
                        throw new Error('Najniža ocena proizvoda je 0.0')
                    } 

                    if (value > 5) {
                        throw new Error('Najveća ocena proizvoda je 5.0')
                    } 

                    return true;
                }),
            body('reviews', 'Broj pregleda je celobrojna vrednost između 1 - 2000')
                .isNumeric()
                .custom(value => {
                    if (value < 1) {
                        throw new Error('Najniži broj pregleda je 1')
                    } 

                    if (value > 2000) {
                        throw new Error('Najviši broj pregleda je 2 000')
                    } 

                    return true;
                }),
            body('filter', 'Polje Ključne Reči je tipa Array')
                .isArray(),
            body('images', 'Polje Linkovi Slika je tipa Array')
                .isArray(),
            ], updateProduct)
    .patch(userIsNotAuthenticated,
        [
            body('stock')
                .isNumeric()
                .withMessage('Polje STANJE je kolicina proizvoda na stanju u gramima.')
                .custom(async(value) => {
                    if (value < 0) {
                        throw new Error('Na stanju ostaje manja kolicina od 0 gr')
                    } 

                    if (value > 10000) {
                        throw new Error('Najveća količina proizvoda je 10 000 gr')
                    } 

                    return true;
                }),
            ], patchProduct );

module.exports = router;