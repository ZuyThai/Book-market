const cloudinary = require("../cloudinary/cloudinary");
const User = require("../models/User");


//getProfile
exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findOne({ _id:userId}).select('name email avatarurl');
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        next(error);
    }
}

//updateProfile
exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate( userId, req.body, {new: true, runValidator: true});
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        next(error);
    }
}