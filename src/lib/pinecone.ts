import dotenv from "dotenv"
import md5 from "md5"
dotenv.config({ path: "../../.env" })
 import fs from "fs"
import { Pinecone } from "@pinecone-database/pinecone"
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter"
import { downloadFromS3 } from "@/lib/s3-server"
import { getEmbeddings } from "./embeddings"
import { convertToAscii } from "./utils"

type VectorMetadata = {
    text: string;
    pageNumber: number;
}

type Vector = {
    id: string;
    values: number[];
    metadata: VectorMetadata; // Use the defined metadata type
}

type PdfPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number };
    }
}

//* Creating a Pineconde Object
export const pinecone = new Pinecone(
    {
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string
    }
)

// * Creating connection to our pinecone
export const connectedToIndex = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX!);
// console.log("Connecttion to Pine Cone =>", connectedToIndex)


/**
 * 
 * 
 * @param filekey 
 * @returns
 * 
 * 
 */

// export async function loadS3toPinecone(filekey: string) {
//     try {

//         //*1. Obtain the pdf => download and read from pdf
//         const langchainLoader = await downloadFromS3(filekey);
//         console.log(langchainLoader);
//         const loadedData = await langchainLoader?.load() as PdfPage[];

//         //*2 Split and segment the pdf
//         const documents = await Promise.all(loadedData.map(prepareDocument));
//         // console.log("Documents +>", documents);

//         //* 3 Vectorize and embed documents
//         const vector = await Promise.all(documents.flat().map(embedDocument));
//         //    console.log("Vectors =>",vector);

// //         //* 4 Upload  Vector to Pinecone
//         // console.log("File Key =>", filekey);
//         const asciiFileKey = convertToAscii(filekey);
//         // console.log("Ascii File key", asciiFileKey)
//         const vectorInPinecone = await connectedToIndex.namespace(asciiFileKey).upsert(vector)
//         // console.log("Vector In Pinecone =>",vectorInPinecone)
//         // console.log(documents[0])
//         // fs.unlinkSync(langchainLoader?.filePathOrBlob as string);
//         return documents[0];

//     } catch (err) {
//         console.log("Err in LoadS3toPineCone =>", err)
//     }

// }


// /**
//  * 
//  * @param page 
//  * We create chunks of small small text for better vector embedding, basically we segment each pages 
//  * @return [
// [
//     Document {
//       pageContent: 'My Tiny Guide to Shadcn, Radix,and TailwindMairaj Pirzada·Follow3 min read·Nov 3, 20233615/7/24, 11:22 AMMy Tiny Guide to Shadcn, Radix, and Tailwind | by Mairaj Pirzada | Mediumhttps://medium.com/@immairaj/my-tiny-guide-to-shadcn-radix-and-tailwind-da50fce3140a#:~:text=The key difference between Radix,to use in your pr...1/8',
//       metadata: [Object]
//     }
// ]
// ]
//  */

export const prepareDocument = async (page: PdfPage) => {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, "");
    // console.log("Page Content =>", pageContent);

    const splitter = new RecursiveCharacterTextSplitter();
    // console.log("Splitter => ", splitter);

    const doc = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ])

    // console.log("Document =>", doc)
    return doc;

}

export async function loadS3toPinecone(filekey: string) {
    try {

        //*1. Obtain the pdf => download and read from pdf
        const langchainLoader = await downloadFromS3(filekey);
        console.log("Lang Chain Loader",langchainLoader);
        const loadedData = await langchainLoader?.load() as PdfPage[];

        //*2 Split and segment the pdf
        const documents = await Promise.all(loadedData.map(prepareDocument));
        console.log("Documents +>", documents);

        //* 3 Vectorize and embed documents
        const vector = await Promise.all(documents.flat().map(embedDocument));

        //* 4 Upload  Vector to Pinecone
        const asciiFileKey = convertToAscii(filekey);
        const vectorInPinecone = await connectedToIndex.namespace(asciiFileKey).upsert(vector)
        console.log("Vector In Pinecone =>",vectorInPinecone)
        console.log(documents[0])
        return documents;


    } catch (err) {
        console.log("Err in LoadS3toPineCone =>", err)
    }

}

// /**
//  * 
//  * @param doc 
//  * This Function creates a vector Embedding
//  */
async function embedDocument(doc: Document): Promise<Vector> {
    try {
        const embeddings = await getEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);
        const vector: Vector = {
            id: hash,
            values: embeddings as number[],
            metadata: {
                text: doc.metadata.text as string,
                pageNumber: doc.metadata.pageNumber as number
            }
        };
        console.log("Pine Cone Vector ",vector);
        return vector;
    } catch (err) {
        console.log("Error in Vector Embedding", err);
        throw err;
    }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}


