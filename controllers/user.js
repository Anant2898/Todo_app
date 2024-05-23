 import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async(req,res,next)=>{
    try{
        const {email,name,password} = req.body;
        const user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid email or password", 400));
    
        
        
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) 
            {
                return next(new ErrorHandler("Invalid email or password", 400));
            }
            sendCookie(user,res,`Welcome ${user.name}`, 200);
            
    }
    catch(error)
    {
        next(error);
    }
    
};
export const register = async(req,res,next)=>{
    try{
       
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
    
        if(user) return next(new ErrorHandler("User already exists", 400));
    
        const hashedpassword = await bcrypt.hash(password,10);
        user = await User.create({
                name,
                email,
                password: hashedpassword
        });
        sendCookie(user,res,"Registered successfully",201);
    }
    catch(error)
    {
        next(error);
    }
    
    
};

export const logout = (req,res)=>{
    console.log("in api!");
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logged out",
    });
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
        user: res.user
    }).status(200); 

};
