import mongoose from "mongoose";
export async function connectToDatabase() {
    try {
      const c= await mongoose.connect(process.env.MONGO_URI , { dbName: "backendapi" });
      console.log(`Backend database connected ${c.connection.host}`);
    } catch (error) {
      console.error(error); 
    } 
  }
