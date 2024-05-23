import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async(req,res,next)=>{
    try {
            const { title,description, isCompleted} = req.body;
        //const {token} = req.cookies
        //const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        //const user = await User.findById(decoded._id);
        
        const task = await Task.create({
            title,
            description,
            isCompleted,
            user: res.user
        });
        res.json({
            success: true,
            message: "task created"
        });
    } catch (error) {
        next(error);
    }
};
export const fetchTasks = async(req,res,next)=>{
    try{
        const tasks = await Task.find({user:res.user});
        //console.log(tasks);
        res.json({
            success:true,
            tasks
        });
    }
    catch(error){
        next(error);
    }
    
};

export const updateTask = async(req,res,next)=>{
    try{
        const task =  await Task.findById(req.params.id);
        if(!task)
        {
            return next(new ErrorHandler("Task not found", 404));
        }
        task.isCompleted = !task.isCompleted;
        
        await task.save();
    
        res.json({
            success:true,
            message: "task updated"
        });
    }
    catch(error)
    {
        next(error);
    }
    
};


export const deleteTask = async(req,res,next)=>{
    try{
                    
        const task = await Task.findById(req.params.id);
        if(!task)
        {
            return next(new ErrorHandler("Task not found", 404));
        }
        await task.deleteOne();
        res.json({
            success:true,
            message: "task deleted"
        });
    }
    catch(error)
    {
        next(error);
    }
};
