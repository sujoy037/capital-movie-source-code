const express= require('express')
const router=express.Router();
const User=require('../model/User')
const mongoose =require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/registration',(req,res,next)=>{

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }else{
            const user=new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                email:req.body.email,
                phno:req.body.phno
            })

            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    newUser:result
                })
            })
    
     
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    err:'page not found'
                })
            })

        }
    })     
})

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                msg:'user not exit'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    error:'password not match'
                })
            }

            if(result){
                const token=jwt.sign({
                    username:user[0].username,
                    email:user[0].email,
                    phno:user[0].phno
                },
                'this is dummy text',
                {
                    expiresIn:'24hr'
                }
                )

                if (!token ){
                    return res.status(500).json({
                        error: true,
                        message: "unable to login"
                    })
                }

                    res.cookie("authtoken", token, {maxAge : new Date(Date.now() + 900000)})

               return res.status(200).json({
                    username:user[0].username,
                    email:user[0].email,
                    // phno:user[0].phno,
                    // token:token
                })    
            }
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports=router