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
        const userId = req.body.userId;
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await User.findByIdAndUpdate(
          userId,
          { name: req.body.name, avatarurl: result.secure_url },
          { new: true, runValidator: true }
        );
        res.status(200).json({
          status: "success",
          data: { name: user.name, avatar: user.avatarurl, email: user.email },
        });
        console.log(`update profile successfully", "userID": "${userId}`)
      } catch (error) {
        console.log(`update profile fail", "userID": "${req.body.userId}`)
        next(error);
      }
}