const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    phno: Number
})
module.exports = mongoose.model('User', userSchema);