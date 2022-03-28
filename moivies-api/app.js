const express=require('express')
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const cors = require("cors")

const app=express();


const userRoutes=require('./api/routes/User');

mongoose.connect('mongodb+srv://sujoy037:6o2anGPrthmznUy0@cluster0.akpdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error',err=>{
    console.log('connection fail');
})

mongoose.connection.on('connected',connected=>{
    console.log('connected');
})


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/',userRoutes); 

// app.use("/discover/:selector", discoverRouter)

module.exports =app;