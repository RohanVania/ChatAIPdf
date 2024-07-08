import { NextResponse } from "next/server";
import {loadS3toPinecone} from "@/lib/pinecone"
import { db } from "@/lib/db";
import { chatPdf } from "@/lib/db/schema";
import {getObjectUrl} from "@/lib/s3"

export async function POST(request:Request,response:Response){
    try{
        const {filename,filekey}=await request.json();

        //* This store the data in Pinecone db which is a vector database used for AI operation for matching
        const data=await loadS3toPinecone(filekey);

        const result=await db.insert(chatPdf).values({
            userId:"1234",
            fileKey:filekey,
            pdfName:filename,
            pdfUrl:getObjectUrl(filekey)as string
        }).returning({
            insertId:chatPdf.id
        })

        return NextResponse.json({message:"Success",status:200,pages:data,databaseUpload:result})

    }catch(err){ 
        console.log(err)
        return NextResponse.json({error:"Internal Error",status:500,err:err})
    }
}




