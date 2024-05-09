'use client'
import React from 'react'
import { IoMdMailOpen } from "react-icons/io";
import {useDropzone}from "react-dropzone"
import { upload } from '@/lib/s3';

type Props = {

}

const FileUpload = (props: Props) => {
    const {getInputProps,getRootProps}=useDropzone({
        accept:{"application/pdf":[".pdf"]},
        maxFiles:1,
        onDrop:async (file)=>{
            console.log(file);
            await upload(file[0]);

        } 
    });


  return (
    <div className='p-2 bg-white rounded-xl mt-7  flex justify-center items-center'>
        <div
            {...getRootProps()} 
        className='border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 w-full py-8 flex flex-col justify-center items-center'>
            <input {...getInputProps()}/>
            <IoMdMailOpen className='text-blue-800 w-[40px] h-[40px]' />
            <p className='mt-2 text-sm text-slate-400'>Drop Pdf here</p>
        </div>
    </div>
  )
}

export default FileUpload