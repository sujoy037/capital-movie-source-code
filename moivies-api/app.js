const express = require('express')
const mongoose = require('mongoose');
// const bodyParser = require('body-parser')
const path = require('path')
const cors = require("cors")
const {db_url} = require('./api/config.json')
const cookieParser = require("cookie-parser");
const userRoutes = require('./api/routes/User');
const movieRouter = require("./api/routes/movies")

const app = express();



mongoose.connect(db_url)


mongoose.connection.on('error', err => {
    console.log('db connection fail');
})

mongoose.connection.on('connected', connected => {
    console.log('db connected');
})


app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "build")));


app.use('/', userRoutes);
app.use('/movies', movieRouter);



// Web app
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});



app.use("*", (req, res)=>{
    return res.status(400).json({message: "Invalid URL"})
})

module.exports = app;