import { User } from "../models/user.js";
import jwt from "jsonwebtoken"
export const isAuth = async(req,res,next)=>{
    
    const {token} = req.cookies;
    if(!token)
    {
         return res.json({
             success: false,
             message: "Login first"
         });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    res.user = await User.findOne({_id:decoded._id}); 
    next();
     
}
