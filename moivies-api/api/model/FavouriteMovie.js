const mongoose = require('mongoose');
const FavouriteMovie = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie_id: {
        type: Number,
        required: true,
    },
    data: Object
})
module.exports = mongoose.model('FavouriteMovie', FavouriteMovie);