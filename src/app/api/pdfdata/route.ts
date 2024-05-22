import { db } from "@/lib/db";
import { chatPdf } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(request:Request,response:Response){
    const res=await db.select().from(chatPdf)
    return NextResponse.json({
        field:"Recently got a new pdf in the database",
        res
    })
}