const bcrypt = require('bcrypt');

const EnhancedError = require('../utils/enhancedError');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

// 
exports.userRegistration = asyncHandler (async (req, res, next) => {
    const { name, email, password } = req.body;
   
        const hashedPassword = await bcrypt.hash(password, 10);

        // ZAPAMTI USERA U MONGODB
        const user = await User.create({
            name,
            email,
            password: hashedPassword 
        });
        //console.log(user);

        res.status(200).json({ success: true });
    })

// OVAJ MIDDLEWARE JE PRESPOJEN SA PASSPORTOM
exports.userLogin = asyncHandler ( (req, res) => {
        //console.log(req.user);
        res.status(200).json({ success: true, data: req.user.name });
    })