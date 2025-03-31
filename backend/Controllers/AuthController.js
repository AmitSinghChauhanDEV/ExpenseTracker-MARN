//yaha pe controll tab aayega jab ye authValidator say validate ho chuka hoga 
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");


//Registration 
const signup = async (req , res) =>{
   
    try {
        const {name, email, password} = req.body;
        
        const user  = await UserModel.findOne({ email });

        if(user) {
            console.log("new user");
            return res.status(409)
                .json({message : 'User is already exist, you can login', success : false });
        }
         // Create a new user
         const newUser = new UserModel({ name, email, password });
         newUser.password = await bcrypt.hash(password, 10);
         await newUser.save();

        res.status(201)
            .json({
                message : "Signup Successfully",
                success : true
            })
    }catch(err) {
        res.status(500)
            .json({
                message: "Internal Server error",
                success : false
            })
    }
}


//login

const login = async (req , res) =>{

    try {
        const {email, password} = req.body;
        
        const user  = await UserModel.findOne({ email });
        const errorMsg = "Auth Failed email or password is wrong";
        if(!user) {
                return res.status(403)
                .json({message : errorMsg, success : false });
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({ message : errorMsg, success: false});
        }

        const jwtToken = jwt.sign(//sign is jwt method
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn : '7d'}
        )
        res.status(200)
            .json({
                message : "login Successfully",
                success : true,
                jwtToken,
                email,
                name: user.name
            })
    }catch(err) {
        res.status(500)
            .json({
                message: "Internal Server error",
                success : false
            })
    }
}



module.exports = {
    signup,
    login
}