
import {Configuration, OpenAIApi} from "openai-edge"
import dotenv from "dotenv"
dotenv.config({path:"../../.env"})

const configuration=new Configuration({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})


const openai=new OpenAIApi(configuration);


/**
 * 
 * @param text 
 * @returns Array
 * This function create a vector embedding using OpenAI model and return the Embedding array
 */

export async function getEmbeddings(text:string){
    try{
           const embeddingOpenAiModel=await openai.createEmbedding({
                input:text.replace(/\n/g," "),
                model:"text-embedding-ada-002",
            })
            
            // console.log("Embedding looks =>",embeddingOpenAiModel);
            const result=await embeddingOpenAiModel.json();
            // console.log("Result =>",result);
            return result.data[0].embedding;
    }
    catch(err){
        console.log("Error Calling openai embeddings api",err);
        throw err
    }
}


