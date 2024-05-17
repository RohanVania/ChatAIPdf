
import {Configuration, OpenAIApi} from "openai-edge"

const configuration=new Configuration({
    apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})


export const openai=new OpenAIApi(configuration);


/**
 * 
 * @param text 
 * @returns Array
 * This function create a vector embedding using OpenAI model and return the Embedding array
 */

export async function getEmbeddings(text:string){
    try{
           const embeddingOpenAiModel=await openai.createEmbedding({
               model:"text-embedding-ada-002",
                input:text.replace(/\n/g," "),
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


