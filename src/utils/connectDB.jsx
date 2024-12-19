import mongoose from "mongoose";

export const connectDB =async ()=>{
    try {

        await mongoose.connect("mongodb+srv://user:user@cluster0.2l8rd.mongodb.net/kushiCabInvoice");

        console.log("database connected successfully");
        
    } catch (error) {
        console.log(error);
    }
}