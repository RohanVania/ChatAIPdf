import { NextResponse } from "next/server";

export async function POST(request:Request,response:Response){
    try{
        const body=await request.json();
        console.log(body);
        return NextResponse.json({messag:"Success",status:200})

    }catch(err){
        return NextResponse.json({error:"Internal Error",status:500})
    }
}