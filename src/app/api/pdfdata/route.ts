import { db } from "@/lib/db";
import { chatPdf } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request:Request,response:Response){
    const {userid}=await request.json();
    const res=await db.select().from(chatPdf).where(eq(chatPdf.userId,userid));
    return NextResponse.json({
        field:"Recently got a new pdf in the database",
        res
    })
}