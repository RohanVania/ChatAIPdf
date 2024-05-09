
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import dotenv from "dotenv"
dotenv.config({path:"../../.env"})

export const client=new S3Client({
    region:process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials:{
        accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_ID as string,
        secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS as string,
    }    
})


export const upload=async(file:File)=>{
    try{

        const fileKey="uploads/"+ Date.now()+ file.name.replace(" ","-");
        
        const command=new PutObjectCommand({
            Bucket:process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
            Key:fileKey,
            Body:file,
            ContentType:file.type,

        })

        const res=await client.send(command);
        console.log(res);
        return res;
    
    }
    catch(err){
        console.log(err);
    }
}
