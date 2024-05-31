
import {Configuration,OpenAIApi} from "openai-edge"
import { NextResponse } from "next/server"
import {OpenAIStream,StreamingTextResponse,Message} from "ai"
import {getContext} from "@/lib/context";


const configuration=new Configuration({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY
})

const openai=new OpenAIApi(configuration)


export const runtime='edge'

export async function POST(req:Request,res:NextResponse){
    try{
        const {messages,chatid}=await req.json();

        console.log("Message =>",messages)
        console.log("Chat ID =>",chatid);

        const latestText=messages[messages.length-1];
        const getContextData=await getContext(latestText,chatid);

        // console.log("Get Context",getContextData);

        const prompt={
            role:"system",
            content:`AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
            AI assistant is a big fan of Pinecone and Vercel.
            START CONTEXT BLOCK
            ${getContextData}
            END OF CONTEXT BLOCK
            AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
            If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
            AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
            AI assistant will not invent anything that is not drawn directly from the context.
            `
        }

        const response= await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:[
                prompt,...messages.filter((message:Message)=>{return message.role==="user"})
            ],
            stream:true,
            
        })

        const stream=OpenAIStream(response);
        const responseText=new StreamingTextResponse(stream);
        
        

        return responseText;

        // return NextResponse.json({message:"Success",status:200})

    }
    catch(err){
        console.log("Error in Chat Route Backend =>",err);
    }
}


