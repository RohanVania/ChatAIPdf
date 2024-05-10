import { Pinecone } from "@pinecone-database/pinecone"
import { downloadFromS3 } from "@/lib/s3-server"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config({ path: "../../.env" })

//* creating a Pineconde Object
export const pinecone = new Pinecone(
    {
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string
    }
)

// * Creating connection to our pinecone
export const connectedToIndex = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX!);


export async function loadS3toPinecone(filekey: string) {
    const fileFromS3 = await downloadFromS3(filekey);
    console.log(fileFromS3.Metadata)
    

}
