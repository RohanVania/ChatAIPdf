"use server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { client } from "@/lib/s3"
import fs from "fs"
import path from 'path'
import { PDFLoader } from "langchain/document_loaders/fs/pdf"


/**
 * 
 * @param filekey 
 * @returns
 * This function helps us to find the file in s3 using Filekey , which we store in temp location to extract all the text from pdf.
 * We use PDF loader to extract all the text from the file,  and whichj we load using lang chain function to create array of each page
 */

export async function downloadFromS3(filekey: string) {
    try {

        const command = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
            Key: filekey
        })
        const rootPath=path.resolve("./");
        console.log(__dirname);
        const file_name = rootPath+`/temp/upload${Date.now()}.pdf`

        const file = await client.send(command)
        //* Transforming File Body to Byte Array which can be stored in Buffer
        const array = await file.Body?.transformToByteArray();
        //* Storing file in temp folder
        fs.writeFileSync(file_name, Buffer.from(array as Uint8Array))
        //* Extracting text from the loaded file
        const loader=new PDFLoader(file_name as string)


        return loader;

    } catch (err) {
        console.log("Something went wrong in download from s3",err);
        return null;
    }

}
