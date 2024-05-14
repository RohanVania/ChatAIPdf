import { NextResponse } from "next/server";
import {loadS3toPinecone} from "@/lib/pinecone"

export async function POST(request:Request,response:Response){
    try{
        const {filename,filekey}=await request.json();

        const data=await loadS3toPinecone(filekey);
        
        return NextResponse.json({message:"Success",status:200,pages:data})

    }catch(err){
        return NextResponse.json({error:"Internal Error",status:500})
    }
}