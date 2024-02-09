const mongoose = require("mongoose")

const User = require("../models/UserSchema")

const Admin = require("../models/AdminnSchema")

const jwt = require("jsonwebtoken")

mongoose.connect("mongodb://localhost:27017/user-management")
    


module.exports ={
    //register an admin account

    register: async(req,res)=>{
        const {name,email,username,password} = req.body;


        await Admin.create({
            name:name,
            email:email,
            username:username,
            password:password
        });
        res.json({message:"Admin registerd successfully"});
    }, 
        //Admin login(post)

        login:async(req,res)=>{
            const{username,password}=req.body;
            console.log(req.body);

            const admin = Admin.findOne({username:username,password:password});
            if(!admin){
                return res.status(404).json({error:"user not found"});

            }
            const token = jwt.sign(
                {username:admin.username},
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({message:"login successful",token});
        },
    
    //create user with name email,username,and photo

    createuser:async(req,res)=>{
        const{name,email,username}=req.body;
        const photo = req.file ? req.filename:"";
        await User.create({
            name:name,
            email:email,
            username:username,
            photo:photo,
        });
        res.json({message:"user created successfully"});
    },


    //get all users list(get)

    getallusers:async(req,res)=>{
        const allusers = await User.find();
        res.status(200).json({
            status:"success",
            message:"successfully fetched users datas",
            data:allusers,
        });
    },
    //Get specfic user based on id(Get/users/:id)

    getuserbyid:async(req,res)=>{
        const userId = req.params.Id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.status(200).json({
            status:"success",

            message:"successfully fetched user data",
            data:user,
        });
    },
    //Update specific user(put/users/id)

    updateuserbyid :async(req,res)=>{
        const userId = req.params.Id;
        const{name,email,username} = req.body;
        const user = await User.findByIdAndUpdate(userId,{$set:{name,username,email},})

        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.json({message:"user updated successfully"});


    },

    //delete a speccific user(Delete/users/:id)

    deleteuserbyid:async(req,res)=>{
        const userId = req.params.Id;
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            res.status(404).json({error:"user not found"})
        }
        res.json({message:"user deleted successfully"});
    },


    
};


