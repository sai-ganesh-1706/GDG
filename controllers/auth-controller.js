 const User = require('../models/User.js');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

 // register controller
const registerUser = async(req, res) => {
    try{
        // extract user info from our req body
        const {username, email,password, role} = req.body;
        //check if the user is already exists in our database
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already exists either with same username or same email. Please try with a different username or email'
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a new user and save in your database
        const newlyCreatedUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        });

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : 'User registered successfully'
            })
        }else{
            res.status(400).json({
                succes : false,
                message : 'User not registered'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : e.message
        })
    }
}

// login controller

const loginUser = async(req,res) => {
    try{
        const {username, password} = req.body;

        //find if the current user is exists in database or not
        const user = await User.findOne({username})
        /*
        This looks inside your users collection in MongoDB.
        It will return the first document where email equals "ganesh@example.com".
        If no document is found → it returns null.
        */
       if(!user){
            return res.status(400).json({
               success : false,
               message : "User doesn't exists" 
            })
       }

       //if the password is correct or not
       const isPasswordMatch = await bcrypt.compare(password, user.password);

       if(!isPasswordMatch){
               return res.status(400).json({
               success : false,
               message : "invalid credentials" 
            })
       }

       const accessToken = jwt.sign({
        userId :user._id,
        username : user.username,
        role : user.role
       },process.env.JWT_SECRET_KEY,{
        expiresIn : '2h'
       })

        // update last login timestamp
        user.lastLogin = new Date();
        await user.save();
        
       // Set token in secure cookie (bonus)
       res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 30*60*1000
       });
 
       res.status(200).json({
         success : true,
         message : 'Logged in successfully',
         accessToken
       })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : e.message
        })
    }
}

module.exports = {registerUser, loginUser};