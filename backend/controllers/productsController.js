const AllProducts = require('../models/allProductsModel');
const Singles = require('../models/singlesModel');

const asyncHandler = require('../middleware/asyncHandler');
const EnhancedError = require('../utils/enhancedError');

// @desc   Get All Products
// @route  GET /products
// @access Public

exports.allProducts = asyncHandler (async (req, res, next) => {
  
    const data =await AllProducts.find();

    if (data.length < 1) {
        return next(new EnhancedError('Ne mogu da učitam proizvode', 500))
    }

    res.status(200).json({success: true, data})
        
});

// @desc   Get Single Product
// @route  GET /products/:id
// @access Public

exports.singleProduct = asyncHandler(
    async (req, res, next) => {
        const {id} = req.params;
    
        const data = await Singles.findOne({id});
        
        if (!data) {
            console.log('Ne postojeci proizvod');
            return next(new EnhancedError('Ne postojeci proizvod', 404));
        }
    
        res.status(200).json({success: true, data})
    }
) 