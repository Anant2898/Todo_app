import express, { urlencoded } from "express"
import { User } from "./models/user.js";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorMiddleware } from "./middlewares/error.js";

export const server = express();

config({
  path: "./data/config.env"
});


//parsing json data we got from post request in json format
server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,  
    methods: ["GET","PUT","POST","DELETE"]
}));
//this line should be kept below above line in so that the json parsing is also done for user.js
server.use( "/api/v1/users" , userRouter);
server.use( "/api/v1/tasks" , taskRouter);
server.get("/",(req,res)=>{
    console.log('aabc');
    res.send("<h1 style='color:red;'>Nice working</h1>");
});


//will fire for urls like http://localhost:4000/userid?id=660948bfa7ad348ed4452152 and http://localhost:4000/userid/ 
server.get("/userid", async(req,res)=>{

    const {id} = req.query;
    console.log("ho");
    const users = await User.findById(id);

    res.json({
        success: true,
        users
    });
    //console.log(req.query);
    
});

server.use(errorMiddleware);

