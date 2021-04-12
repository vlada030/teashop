const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const {allProducts, singleProduct, updateProduct, patchProduct} = require('../controllers/productsController');
const {userIsNotAuthenticated, isUserAdmin} = require('../middleware/checkUserAuthentication');

router.route('/').get(allProducts);
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
                    if (value < 30) {
                        throw new Error('Najmanja količina proizvoda je 30gr')
                    } 

                    if (value > 10000) {
                        throw new Error('Najveća količina proizvoda je 10 000 gr')
                    } 

                    return true;
                }),
            ], updateProduct)
         .patch(userIsNotAuthenticated,
            [
                body("id")
                    .isLength({min:5, max: 5})
                    .withMessage("Šifra proizvoda treba da sadrži 5 broja.")
                    .trim(),
                body('stock')
                    .isNumeric()
                    .withMessage('Polje STANJE je kolicina proizvoda na stanju u gramima.')
                    .custom(async(value) => {
                        if (value < 0) {
                            throw new Error('Na stanju ostaje manja kolicina od 0gr')
                        } 
    
                        if (value > 10000) {
                            throw new Error('Najveća količina proizvoda je 10 000 gr')
                        } 
    
                        return true;
                    }),
                ], patchProduct );

module.exports = router;