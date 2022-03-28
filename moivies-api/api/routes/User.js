const express = require('express')
const router = express.Router();
// const User = require('../model/User')
// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { Register, Login, Profile, Logout } = require('../controller/Auth');
const { is_authenticated } = require('../middleware/auth_middleware');



router.post('/registration', Register)

router.post('/login', Login)

router.get('/profile', is_authenticated, Profile)

router.post('/logout', is_authenticated, Logout)





module.exports = router