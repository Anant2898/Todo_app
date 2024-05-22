import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
export const getAllUsers = async(req,res)=>{
        
};
export const login = async(req,res,next)=>{
    const {email,name,password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(user)
    {
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(404).json({
                success: false,
                message: "Invalid User username or password"
            });;
        }
        sendCookie(user,res,`Welcome ${user.name}`, 200);
    }
    else{
        res.status(404).json({
            success: false,
            message: "Invalid User username or password"
        });
    }
};
export const register = async(req,res)=>{
    console.log(0);
    const {name,email,password} = req.body;
        console.log(1);
    let user ;//= await User.findOne({email});
    if(user)
    {
        return res.status(404).json({
            success: false,
            message: "User already exists"
        });
    }
        console.log(2);
    const hashedpassword = await bcrypt.hash(password,10);
    user = await User.create({
            name,
            email,
            password: hashedpassword
    });
        console.log(3);
    sendCookie(user,res,"Registered successfully",201);
};

export const logout = (req,res)=>{
    const {token} = req.cookies;
    res.cookie("token",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development"? "lax" : "none",
        secure: process.env.NODE_ENV === "Development"? false:true 
    }).json({
        success:true,
        
        message:"logged out!"
    })
};

export const getMyProfile = (req,res)=>{
   /* const {id} = req.params;
    const user = await User.findOne({_id:id}); // or await User.findByID(id); 
    // or User.findOne({_id:id , email : "lun.0@gmail.com"}); for multiple fields check
    res.json({
        success: false,
        user
    });
    */
    res.json({
        success: true,
        user: res.user.name
    }).status(200); 

};
