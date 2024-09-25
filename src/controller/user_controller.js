const mongoose = require("mongoose");
const User = require("../models/user_model");
const userJwtToken = require("../utils/jwt");
const bcrypt = require("bcrypt")


exports.userInsert = async (req, res) => {
    try {
        let {
            name,
            email,
            password,
            mobile,
            dob,
            gender,
            address,
            city,
            pincode,
            state,
            country,
        } = req.body;


        let exitsEmailData = await User.findOne({ email });
        if (exitsEmailData) {
            return res.status(400).json({
                success: false,
                message: "Email Is Already Exits!",
            });
        } else {
            let hash = await bcrypt.hash(password, 10);
            let userData = new User({
                name,
                email,
                password: hash,
                mobile,
                dob,
                gender,
                address,
                city,
                pincode,
                state,
                country,
                profile_photo: req.file.filename
            });
            let result = await userData.save();

            res.status(200).json({
                success: true,
                message: "User Profile Add Successfully",
                data: result,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.UserLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        let user = await User.findOne({ email });
        if (user) {
            let comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                let token = await userJwtToken(user._id);
                res.status(200).json({
                    success: true,
                    message: "User Login Successfully",
                    data: token,
                    userId: user._id,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Password Is Incorrect!",
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: "Email Not Found!",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.editUser = async (req, res) => {
    try {
        let userId = req.user;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found!",
            });
        }
        let {
            name,
            email,
            mobile,
            dob,
            gender,
            address,
            city,
            pincode,
            state,
            country,
        } = req.body;


        let updateData = {
            name,
            email,
            mobile,
            dob,
            gender,
            address,
            city,
            pincode,
            state,
            country,
        };

        if (req.file && req.file.filename) {
            const profile_photo = req.file.filename; 
            updateData.profile_photo = req.file.filename; 
        }

        let userUpdateData = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: userUpdateData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.profileDisplay = async (req, res) => {
    try {
        let userId = req.user;
        let user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Display Successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.deleteProfile = async (req, res) => {
    try {
        let userId = req.user;
        let user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Delete Successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}