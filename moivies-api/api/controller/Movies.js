const { movie_api_key, movie_api_url } = require("../config.json")
const axios = require("axios")
const FavouriteMovie = require("../model/FavouriteMovie")

exports.GetAllMovies = async (req, res) => {
    try {
        /**
         * Only 2 types of tag is valid
         * tag = popular || latest 
         */
        const tag = req.query?.tag
        const page = req.query?.page || 1

        console.log(tag);

        if (tag != "popular" && tag != "latest") {
            return res.status(400).json({
                message: "Unable to process."
            })
        }


        // fetch the movies over tag 
        // .........................
        const params = {
            params: {
                api_key: movie_api_key,
                page: page,
                sort_by: tag == "popular" ? "popularity.asc" : tag == "latest" ? "release_date.desc" : "original_title.asc"
            }
        }

        const data = await axios.get(movie_api_url, params)
        console.log(data.data.results.length);

        return res.status(200).json({
            data: data.data,
            message: "All movies fetched."
        })
    } catch (error) {
        console.log("get all movie error", error.message);
        return res.status(400).json({
            message: "Fail to fetched."
        })
    }
}


// get
exports.GetAllFavourites = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) return res.status(403).json({
            message: "Invalid user."
        })


        // fetch all the favourites movies of this user 
        // ......................................................
        const list = await FavouriteMovie.find({ user: id })

        return res.status(200).json({
            data: list,
            message: "All movies fetched."
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Fail to fetched."
        })
    }
}


// post
exports.AddToFavourite = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) return res.status(403).json({
            message: "Invalid user."
        })

        const data = req.body
        if (!data) return res.status(422).json({
            message: "Unable to process"
        })

        // check exists movie
        let existed_data = await FavouriteMovie.find({ movie_id: data?.id })
        // console.log(existed_data);
        if (existed_data?.length > 0) return res.status(200).json({
            message: "This movie is already added to your favourite"
        })

        const movie = new FavouriteMovie({ user: id, movie_id: data?.id, data: data })
        const save = await movie.save()
        if (!save) return res.status(400).json({
            message: "Fail to add to your favourite."
        })

        // add the favourites movies of this request user and load to movie_list array
        // ......................................................
        console.log("new movie added to fav list");

        return res.status(200).json({
            message: "New movie added to your favourite"
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message: "Fail to add to your favourite."
        })
    }


}


// delete
exports.RemoveFromFavourite = async (req, res) => {
    try {
        const { id } = req.user

        if (!id) return res.status(403).json({
            message: "Invalid user."
        })

        const { movie_id } = req.params
        if (!movie_id) return res.status(422).json({
            message: "Unable to process"
        })

        // remove all from fav
        if (movie_id == "all") {
            await FavouriteMovie.remove()
            // ......................................................
            console.log("All remove from fav list");
            return res.status(200).json({
                message: "All Movie removed from your favourite list."
            })
        } else {
            // remove by movie_id
            const deleted = await FavouriteMovie.findOneAndRemove({ user: id, movie_id: movie_id })
            if (!deleted) return res.status(400).json({
                message: "Fail to remove."
            })

            // ......................................................
            console.log("Remove from fav list");
            return res.status(200).json({
                message: "Movie removed from your favourite list."
            })
        }

        // add the favourites movies of this request user and load to movie_list array


    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message: "Fail to add to your favourite."
        })
    }


}