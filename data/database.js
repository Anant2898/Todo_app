import mongoose from "mongoose";
export async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI , { dbName: "backendapi" });
      console.log("Backend database connected");
    } catch (error) {
      console.error(error);
    } 
  }