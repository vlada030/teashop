const Singles = require('../models/singlesModel');

const asyncHandler = require('../middleware/asyncHandler');
const EnhancedError = require('../utils/enhancedError');
const {validationResult} = require('express-validator');

// @desc   Get All Products
// @route  GET /allproducts
// @access Public

exports.allProducts = asyncHandler (async (req, res, next) => {
  
    const data = await Singles.find().select('id name description price package category filter images featured');
    
    // prilagodjavanje podataka koji se vracaju front-endu
    let updatedData = data.map(item => {
        const {id, name, description, price, package, category, filter, images, featured} = item;
        return {id, name, description, price, package, category, filter, image: images[0], featured}
    })
    
    if (data.length < 1) {
        return next(new EnhancedError('Ne mogu da učitam proizvode', 500))
    }

    res.status(200).json({success: true, data: updatedData});
        
});

// @desc   Get Single Product
// @route  GET /allproducts/:id
// @access Public

exports.singleProduct = asyncHandler(
    async (req, res, next) => {
        const {id} = req.params;

        if (id.length !== 5) {
            return next(new EnhancedError('Pogrešan format šifre porizvoda', 404));
        }
    
        const data = await Singles.findOne({id});
        
        if (!data) {
            return next(new EnhancedError('Ne postojeći proizvod', 404));
        }
    
        res.status(200).json({success: true, data})
    }
) 

// @desc   Update Product
// @route  PUT /allproducts/:id
// @access Private

exports.updateProduct = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);

    const errorsString = errors.array().reduce((acc, val) => {
        acc += `${val.msg}; `;
        return acc
    }, '');
        
    // validacija preko express-validatora
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errorsString
        })
    }
    
    const product = await Singles.findOne({id: req.body.id});
    if (!product) {
        return next(new EnhancedError('Traženi proizvod ne postoji u sistemu.', 404))
    }

    const updatedProduct = await Singles.findOneAndUpdate({id: req.body.id}, req.body, {
        new: true });
    
    res.status(200).json({success: true, data: {stock: updatedProduct.stock, price: updatedProduct.price}, message: 'Proizvod uspešno izmenjen.'})
}) 