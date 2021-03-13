const express = require('express');
const router = express.Router();

const {allProducts, singleProduct} = require('../controllers/productsController');

router.route('/').get(allProducts);
router.route('/:id').get(singleProduct)

module.exports = router;