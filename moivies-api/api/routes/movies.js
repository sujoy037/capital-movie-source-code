const express = require('express')
const router = express.Router();

const { GetAllMovies, AddToFavourite, GetAllFavourites, RemoveFromFavourite } = require('../controller/Movies');
const { is_authenticated } = require('../middleware/auth_middleware');


// all movies with filter
router.get('/', GetAllMovies)

// add to favourite
router.get('/favourites', is_authenticated, GetAllFavourites)

// get all favourite
router.post('/favourites', is_authenticated, AddToFavourite)

// delete from fav
router.delete('/favourites/:movie_id', is_authenticated, RemoveFromFavourite)



module.exports = router