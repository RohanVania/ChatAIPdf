
export async function GET(request:Request){
    return Response.json({name:"Hello-World"})
}

export async function POST(reques:Request){
    return Response.json({name:"Hello world -post"})
}