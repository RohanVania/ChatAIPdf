import { db } from "@/lib/db";
import { chatPdf } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request:Request,response:Response){
    const {userid,provider}=await request.json();
    const res=await db.select().from(chatPdf).where(
    and(
        eq(chatPdf.userId,userid),
        eq(chatPdf.provider,provider)
    )
    );
    return NextResponse.json({
        field:"Recently got a new pdf in the database",
        res
    })
}