import { eq } from "drizzle-orm";
import { db } from "./db";
import { chatPdf } from "./db/schema";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";
import { Pinecone } from "@pinecone-database/pinecone";
import { Metadata } from "next";

//* Creating a Pineconde Object
export const pinecone = new Pinecone(
    {
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string
    }
)

// * Creating connection to our pinecone
export const connectedToIndex = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX!);

export const getRelatedVector = async (chatid: string, vectorEmbedding: number[]) => {
    try {
        if (!chatid) {
            throw new Error("Missing Chatid to get namespace")
        }

        //* Lets get the file key as we storing the file key as the namespace in Pinecone
        const filekeyResult = await db.select({
            file_key: chatPdf.fileKey,
        }).from(chatPdf).where(eq(chatPdf.id, chatid));

        if(filekeyResult.length!=1){
            throw new Error('Pdf not found tp chat')
        }

        const file_key = filekeyResult[0].file_key;
        // console.log("File Key =>", file_key);

        //** Convert the filekey to ascii string so that there is no error later as pinecone namespacee can only be ascii character */
        const namespace = convertToAscii(file_key);
        // console.log("Ascii File Key", namespace);

        const queryResult=await connectedToIndex.namespace(namespace).query({
            topK: 7,
            vector: vectorEmbedding,
            includeMetadata: true,
        })

        // console.log("Matching Vector Embedding query Result =>",queryResult);
        return queryResult.matches || [];

    } catch (err) {
        console.log(err);
        throw new Error(`${err}`)
    }
}

type MetaData={
    text:string,
    pageNumber:number
}

//* We get the Input Query and match it with the Vector Embedding of our Pdf
export async function getContext(query?: {role:string,content:string}, chatid?: string) {
    try {
        console.log("query =>", query);
        console.log("ChatId =>", chatid);

        if (!query) {
            throw new Error("Missing Query for Embeddings");
        }

        const vectorForQuery = await getEmbeddings(query?.content);
        const relatedVectorResult=await getRelatedVector(chatid!, vectorForQuery!);

        const qualifyingDocs=relatedVectorResult?.filter(match=>match.score && match.score >0.7)
        // console.log("Qualifying Docs =>",qualifyingDocs)

        let docs=qualifyingDocs?.map((match)=>{return (match.metadata as MetaData).text})
        // console.log("Documents =>",docs);

       return docs?.join('\n').substring(0,4000);



    } catch (err) {
        console.log(err);
        throw new Error(`${err}`);
    }

}