import ID from "@/models/Id";
import { connectDB } from "@/utils/connectDB"
import { NextResponse } from "next/server";


export const GET =async (request)=>{
    try {

        await connectDB();

        const id = await ID.findOne({});
        console.log(id);
        if(!id){
            const id2 = await ID.create({id:1});
            console.log(id2);
        }
        else{
        await ID.findByIdAndUpdate(id._id, {id: (+id.id) + 1});
        }
        return NextResponse.json({id});
        
    } catch (error) {
        console.log(error)
    }
}