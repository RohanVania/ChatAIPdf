import { NextResponse } from "next/server";

export async function POST(request:Request,response:Response){
    console.log("Request Body ",await request.json())
    return NextResponse.json("hello post method")

}