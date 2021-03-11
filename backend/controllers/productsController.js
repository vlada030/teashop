exports.allProducts = (req, res) => {

    res.status(200).json({success: true, message: 'all products'})
}

exports.singleProduct = (req, res) => {

    res.status(200).json({success: true, message: 'single product'})
}