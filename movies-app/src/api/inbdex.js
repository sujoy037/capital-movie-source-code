import axios from "axios"


export const postRegister = async (data) => {
    try {
        const res = await axios.post('/registration', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}



export const postLogin = async (data) => {
    try {
        const res = await axios.post('/login', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getProfile = async () => {
    try {
        const res = await axios.get('/profile')
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const logout = async () => {
    try {
        const res = await axios.post('/logout', {})
        return res.data
    } catch (error) {
        return error.response.data
    }
}


export const getAllMovies = async (page, tag) => {
    try {
        const res = await axios.get('/movies', {
            params: {
                tag: tag || "popular",
                page: page || 1
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getFavMovies = async () => {
    try {
        const res = await axios.get('/movies/favourites')
        return res.data
    } catch (error) {
        return error.response.data
    }
}


export const postNewFav = async (data) => {
    try {
        const res = await axios.post('/movies/favourites', data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const removeFav = async (id) => {
    try {
        const res = await axios.delete(`/movies/favourites/${id}`)
        return res.data
    } catch (error) {
        return error.response.data
    }
}