"use client"
import { useState } from "react";
import { motion } from "framer-motion"
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";
import { Button } from './ui/button';
import React from "react";
import { DrizzleChat, chatPdf } from "@/lib/db/schema"
import Link from "next/link"
import { cn } from "@/lib/utils";
import logo from "../../public/download.png"
import Image from "next/image"
import { useRouter } from "next/navigation";

type Props = {
    allChatPdfForGivenUser?: DrizzleChat[],
    activePdfId?: number
}

const ChatSideBar = ({ allChatPdfForGivenUser, activePdfId }: Props) => {
    const router=useRouter();


    const [isOpen, setIsOpen] = useState(true);

    const sidebarVariants = {
        open: {
            width: '100%',
            transition: {
                duration: 0.3
            }
        },
        closed: {
            width: ['100%', '0px'],
            transition: {
                duration: 0.5
            },
            display: 'none',
        }
    };

    const buttonVariants = {
        opened: {
            opacity: [0, 1],
            x: [-200, 0],
            transitionStart: {
                display: 'block'
            },
            transition: {
                duration: 0.7,
                delay: 0.23332
            }
        },
        closed: {
            opacity: 0,
            x: [0, -200],
            transition: {
                duration: 0.3
            },

        }
    };


    const ListBox = {
        opened: {
            x: [-100, 0],
            transition: {
                delay: 0.2,
            }
        },
        closed: {
            x: -100,
            trnasition: {
                delay: 0.3,
            }
        }
    }

    const ListVariants = {
        opened: {
            opacity: [0, 1],
            transition: {
                duration: 0.4,
                delay: 0.5
            }
        },
        closed: {
            opacity: [1, 0],
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {
                !isOpen &&
                <div className='p-2  justify-between items-center bg-green-40 absolute top-[8px] left-[8px] z-[10] '>
                    <div className=" ml-auto rounded-full overflow-hidden">
                        
                        <FaAngleDoubleRight className={` text-[#5900F2] bg-white text-4xl p-2 rounded-full  cursor-pointer border-[2px]   `} onClick={toggleSidebar} />
                    </div>
                </div>
            }

            <motion.div
                className='h-scree h-full  bg-gray-900 max-w-[255px] text-gray-200 relative  overflow-hidden '
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
            >

                <div className='p-4 flex justify-between items-center '>
                    <div className="w-[40px] aspect-square  rounded-lg overflow-hidden cursor-pointer" onClick={()=>{router.push("/")}}>
                        <Image src={logo} alt="logo-pdf" className="rounded-lg w-full h-full " />
                    </div>
                    <div className=" ml-aut ">
                        <FaAngleDoubleLeft className={` text-[#5900f2]  text-4xl p-2 rounded-full bg-white cursor-pointer `} onClick={toggleSidebar} />
                    </div>
                </div>

                <div className='w-full h-ful px-4  mt-6 mb-5'>

                    <div
                        // initial={false}
                        // animate={isOpen ? "opened" : "closed"}
                        // variants={buttonVariants}
                        className='w-full mt-4  text-center'>
                        <Button className='border border-white border-dashed  ' onClick={() => setIsOpen(!isOpen)}>
                            <Link href={"/"} className="flex gap-3  ">
                                Create a new chat
                                <GoPlusCircle className='text-xl' />
                            </Link>
                        </Button>
                    </div>
                </div>

                <motion.div
                    initial={false}
                    animate={isOpen ? "opened" : "closed"}
                    variants={ListBox}
                    className="container flex flex-col gap-y-2 pl-2 pr-0 mt-5  h-[75.3%]">

                    <motion.div
                        animate={isOpen ? "opened" : "closed"}

                        variants={ListVariants}
                        className="bg-red-80 overflow-y-auto flex flex-col gap-y-3">
                        {
                            allChatPdfForGivenUser?.map((chat) => {
                                return (
                                    <Link key={chat.id} href={`/chat/${chat.id}`} >

                                        <div className={
                                            cn('rounded-lg rounded-br-none rounded-tr-none p-3 text-slate-300 flex items-center', {
                                                'bg-[#5900F2] text-white': chat.id === activePdfId,
                                                'hover:text-white': chat.id !== activePdfId
                                            })
                                        }>
                                            <TbMessageCircle className="mr-2" />
                                            <p className="bg-red-20 w-full text-sm truncate  ">{chat.pdfName}</p>
                                        </div>
                                    </Link>



                                )
                            })
                        }
                    </motion.div>
                </motion.div>

                <div className="bg-pink-40  flex justify-start ">
                    <div className="absolute bottom-0 w-ful  m bg-pink-80 p-2 py-3">
                        <div className="flex items-center gap-2 mx-auto text-sm text-slate-500 flex-wra">
                            <Link href={"/"}>
                                <Button className="bg-blue-700">Home</Button>
                            </Link>
                            <Link href={"/"}>
                                <Button className="bg-blue-700">Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>



            </motion.div>
        </>
    );
};

export default ChatSideBar;
