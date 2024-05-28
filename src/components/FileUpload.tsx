'use client'
import { IoMdMailOpen } from "react-icons/io";
import { useDropzone } from "react-dropzone"
import { upload } from '@/lib/s3';
import { LuLoader2 } from "react-icons/lu";
import { useMutation } from '@tanstack/react-query';
import axios from "axios"
import { Routes } from "@/lib/routes/index"
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation" 

type Props = {
    classname?:string
}

type FileData = {
    filename: string,
    filekey: string
}

const FileUpload = (props: Props) => {

    const router=useRouter();

    /**
     *  This Function Calls the Backend Api and sends the filekey and filename
     * 
     */
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FileData) => {
                try {

                    const axiosResult = await axios.post(Routes.createchat, {
                        filename: data.filename,
                        filekey: data.filekey
                    })

                    console.log("Calling the Backend Api", axiosResult);
                    return axiosResult.data

                }
                catch (err) {
                    console.log("Error in react query mutate function", err)
                }
                
            }
            
            
    });

    

    const { getInputProps, getRootProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },  //* Only Pdf Files Allowed
        maxFiles: 1,                              //* One File

        //* When we drop the file it gets uploaded in S3
        onDrop: async (file) => {
            console.log(file);
            const res = await upload(file[0]);
            // console.log("Data that upload function returned",res);

            if (!res?.filekey || !res?.filename) {
                console.log("Something went wrong during upload")
                return;
            }


            // callBackend(res as FileData)

            mutate(res as FileData, {
                onSuccess: (data) => {
                    console.log("On Success Data =>", data)
                    const { insertId: chatpdfId } = data.databaseUpload[0];

                    if (chatpdfId === null || chatpdfId === undefined) {
                        throw new Error("Unable to get the chatpdf Id");
                    }
                    router.push(`/chat/${chatpdfId}`);
                    toast.success("Successfully uploaded the file", { id: "success-1" })
                },
                onError: (err) => {
                    toast.error("Something went wrong", { id: "Mutate-error-1" })
                    console.log(err);
                }
            })

            

        }

    });


    return (
        <div className={`p-2 bg-white rounded-xl mt-0  flex justify-center  h-[97%] items-baseline  `}>
            {!isPending ?
                <div {...getRootProps()} className={`border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 w-full py-8 flex flex-col justify-center items-center min-h-[140px]  ${props?.classname}`}>
                    <input {...getInputProps()} />
                    <IoMdMailOpen className='text-blue-700 w-[40px] h-[40px]' />
                    <p className='mt-2 text-sm text-slate-400'>Drop Pdf here</p>
                </div>
                :
                <div 
                className={`border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 w-full py-8 flex flex-col justify-center items-center min-h-[140px]  ${props?.classname}`}
                >
                    <LuLoader2 className='text-blue-700 w-[30px] h-[30px] animate-spin ' />
                    <p className='mt-3 text-sm text-slate-400'>Spealing Tea to Gpt </p>
                </div>
            }
        </div>
    )
}


export default FileUpload



