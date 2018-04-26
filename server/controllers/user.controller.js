const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const decode = require('../helpers/decode-password');
const decodeJwt = require('../helpers/decode-jwt')

module.exports = {

    signUp: function(req , res){
        let new_user =
        { 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            articles: []
        }
        // res.status(200).send('yes')
        User.create(new_user).
        then((user)=>{
          
            let token = jwt.sign({ email: user.email }, process.env.SECRET);
            res.status(200).json({
                message:'User successfuly registered',
                token: token
            });
        })
        .catch((err)=>{
            if(err.code === 11000){
                res.status(400).json({
                    message:'Please Use another email'
                });
            }else{
                res.status(500).json({
                    message:'Server error'
                });
            }            
        });
    },
    
    signIn: function(req, res){
        let logged_user =
          {
            email: req.body.email,
            password: req.body.password
          }

          User.findOne({ email: logged_user.email})
          .then((user)=>{ 
                
            if(decode.verify(logged_user.password, user.password)){

              let token = jwt.sign({ email: user.email }, process.env.SECRET);

              res.status(200).json({
                message:'Succeed login',
                token : token
              });
            } else {
              res.status(400).json({
                message:'Email/password is invalid',
              });
            }
    
          })
          .catch((err)=>{
            res.status(500).json({
              message:'Server error',
              err: err
            });
          });
      }
}
