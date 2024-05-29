
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

export const client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    }
})


/**
 * 
 * @param File  
 * This function is used for uploading file to s3 which returns following
 * @returns File name and File Key
 */

// * Uploading file to 
// * Progress feature left
export const upload = async (file: File) => {
    try {
        const fileKey = "uploads/" + Date.now() + file.name.replaceAll(" ", "");


        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
            Key: fileKey,
            Body: file,
            ContentType: file.type,
            BucketKeyEnabled:true
        })
        const res = await client.send(command);
        // console.log(res);
        return {
            filekey:fileKey,
            filename:file.name
        };

    }
    catch (err) {

        console.log("Something went wrong inside the Upload function",err);
    }
}


//* Later we resolve the issues for spaces and , and any special characters
export const getObjectUrl = (filekey: string) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
            Key: filekey
        })

        // const response=await client.send(command);
        const url=`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filekey}`;
        // console.log("Path for S3 Url =>",url)
        return url as string;
    } catch (err) {
        console.log("Error in s3 getting url",err)
    }
}
