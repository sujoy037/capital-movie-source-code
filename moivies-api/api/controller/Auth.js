const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwt_secret } = require("../config.json");
const { generate_auth_token } = require('../middleware/auth_middleware');
const User = require('../model/User')



exports.Register = async (req, res) => {
    try {
        const { username, password, email, phno } = req.body

        if (!username || !password || !email || !phno) return res.status(422).json({
            error: true,
            message: "Unable to process"
        })

        // check for exists user
        const is_exists_user = await User.findOne({ email: email })
        if (is_exists_user) return res.status(400).json({
            error: true,
            message: "User already exists"
        })


        const hash = await bcrypt.hash(password, 10)
        if (!hash) return res.status(500).json({
            error: true,
            message: "Fail to process"
        })

        const user = new User({
            username: username,
            password: hash,
            email: email,
            phno: phno
        })

        const save_user = await user.save()
        if (!save_user) return res.status(500).json({
            error: true,
            message: "Fail to process"
        })

        return res.status(201).json({
            message: "Registration successfull!"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fail to process!"
        })
    }
}


exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(422).json({
            error: true,
            message: "Unable to process"
        })

        // check for exists user
        const user = await User.findOne({ email: email }).select('password username email phno')
        if (!user) return res.status(400).json({
            error: true,
            message: "User not found!"
        })


        const is_pass_matched = await bcrypt.compare(password, user?.password)
        if (!is_pass_matched) return res.status(500).json({
            error: true,
            message: "Fail to process"
        })


        // console.log({ user });
        // const token = await generate_auth_token({ id: user._id, email: user.email })
        const context = { id: user._id, username: user.username, email: user.email }
        const token = await generate_auth_token(context)

        if (!token) {
            return res.status(500).json({
                error: true,
                message: "unable to login"
            })
        }

        // console.log("login user : ", user);
        res.cookie('authtoken', token, {
            maxAge: new Date(Date.now() + 900000),
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            // Forces to use https in production
            secure: process.env.NODE_ENV === 'production' ? true : false
        });
        ////////////////////////////////////////////////
        console.log("login success");
        res.user = context
        return res.status(201).json({
            message: `Welcome ${user.username}!`
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fail to process!"
        })
    }
}


exports.Profile = async (req, res) => {
    try {
        const { id } = req.user
        // console.log("user: ", user);

        // check for exists user
        const user_profile = await User.findOne({ _id: id }).select('username email phno')
        if (!user_profile) return res.status(400).json({
            error: true,
            message: "User not found!"
        })


        return res.status(200).json({
            data: user_profile,
            message: `Profile fetched.`
        })

    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            message: "Fail to process!"
        })
    }
}


exports.Logout = async (req, res) => {
    try {

        res.clearCookie("authtoken");
        delete req.user
        console.log("logged out");
        return res.json({ message: "logout success" });


    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            message: "Fail to process!"
        })
    }
}