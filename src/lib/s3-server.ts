"use server"
import {GetObjectCommand} from "@aws-sdk/client-s3"
import {client} from "@/lib/s3"
import fs from "fs"

export async  function downloadFromS3(filekey:string){
    const command = new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
        Key: filekey
    })
    const path = `upload${Date.now()}.pdf`


    const file=await client.send(command)
    const array = await file.Body?.transformToByteArray()
    fs.writeFileSync(path, Buffer.from(array as Uint8Array))
    console.log(1)
    return file;


}
