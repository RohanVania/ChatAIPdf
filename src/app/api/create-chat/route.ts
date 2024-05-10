import { NextResponse } from "next/server";
import {loadS3toPinecone} from "@/lib/pinecone"

export async function POST(request:Request,response:Response){
    try{
        const {filename,filekey}=await request.json();
        loadS3toPinecone(filekey);
        return NextResponse.json({messag:"Success",status:200})

    }catch(err){
        return NextResponse.json({error:"Internal Error",status:500})
    }
}