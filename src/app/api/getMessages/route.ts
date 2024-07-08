import { NextResponse } from "next/server";
import {db} from "@/lib/db/index"
import {messages as messageTable} from "@/lib/db/schema"
import { eq } from "drizzle-orm";
export async function POST(request:Request,response:Response){
    try{

        const {chatid}= await request.json();
        const queryResult=await db.select().from(messageTable).where(eq(messageTable.chatId,chatid)).orderBy(messageTable.createdAt);
        return NextResponse.json({status:'success',messagesforPdf:queryResult});
        
    }catch(err){
        console.log("Error in Getting messages",err);
        throw err; 
    }

}