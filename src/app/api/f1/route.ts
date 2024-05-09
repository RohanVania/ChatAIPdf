export async function GET(request:Request){
    return Response.json({name:"Hello-World -f1"})
}

export async function POST(reques:Request){
    return Response.json({name:"Hello world -post -f1"})
}