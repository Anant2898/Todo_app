import { server } from "./app.js";
import { connectToDatabase } from "./data/database.js";

connectToDatabase();

server.listen(process.env.PORT, ()=>{
    console.log(`server's up and running :) in ${process.env.NODE_ENV } mode ` );
}); 
