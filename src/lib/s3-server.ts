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
 * We use PDF loader to extract all the text from the file,  and which we load using lang chain function to create array of each page
 */

export async function downloadFromS3(filekey: string) {
    try {

        const command = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
            Key: filekey
        })
        
        const tempDir = path.resolve("./temp");
        console.log(tempDir);
        console.log(__dirname);

        if (!fs.existsSync(tempDir)) {
            console.log(fs.mkdirSync(tempDir, { recursive: true }));
            
        }

        const rootPath = path.resolve("./");
        console.log(-2)
       console.log(rootPath); 
        const file_name = rootPath + `/temp/upload${Date.now()}.pdf`
        console.log(-2)
        const file = await client.send(command)
        console.log(-1)
        //* Transforming File Body to Byte Array which can be stored in Buffer
        const array = await file.Body?.transformToByteArray();
        console.log(1);
        //* Storing file in temp folder
        fs.writeFileSync(file_name, Buffer.from(array as Uint8Array))
        console.log(2);
        //* Extracting text from the loaded file
        const loader = new PDFLoader(file_name as string)
        console.log(3);
        return loader;

    } catch (err) {
        console.log("Something went wrong in download from s3", err);
        return null;
    }

}
