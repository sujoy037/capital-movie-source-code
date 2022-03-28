const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors")
const cookieParser = require("cookie-parser");
const userRoutes = require('./api/routes/User');
const movieRouter = require("./api/routes/movies")

const app = express();



mongoose.connect('mongodb+srv://sujoy037:6o2anGPrthmznUy0@cluster0.akpdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error', err => {
    console.log('connection fail');
})

mongoose.connection.on('connected', connected => {
    console.log('connected');
})


app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', userRoutes);

app.use('/movies', movieRouter);

app.use("*", (req, res)=>{
    return res.status(400).json({message: "Invalid URL"})
})

module.exports = app;