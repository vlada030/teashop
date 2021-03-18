const User = require('../models/userModel');

exports.getUserByEmail = async (email) => {
    return await User.findOne({email}).select('+password');
}