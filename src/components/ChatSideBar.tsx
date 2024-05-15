import React from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { Button } from './ui/button';

type Props = {}

const ChatSideBar = (props: Props) => {
    return (
        <div className=' min-h-screen w-[245px] max-w-[245px] pt-4 py-4  bg-gray-900 '>
            <p className=' flex justify-between items-center relative px-4  '>
                <p>Logo</p>
                <FaAngleDoubleLeft className=' text-4xl p-2 rounded-full bg-white cursor-pointer' />
            </p>
            <div className=' w-full h-full px-4 py-4 '>
                <div className=' w-full mt-4'>
                    <Button className='flex gap-3 border border-white border-dashed mx-auto'>
                        Create a new chat
                        <GoPlusCircle className='text-xl' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatSideBar