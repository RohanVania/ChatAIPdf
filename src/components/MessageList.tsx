"use client"

import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'
import { LuLoader2 } from "react-icons/lu";

type Props = {
    messages: Message[],
    isLoading?: boolean
}

const MessageList = ({ messages, isLoading }: Props) => {
    
    // console.log("Loading",isLoading)
    // console.log("messages",messages);

    if (isLoading) {
        return (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <LuLoader2 className='w-6 h-6 animate-spin'/>
            </div>
        )
    }
    if (!messages) return <h1>
        pLEASE CHAT SOMETHING
    </h1>

    return (
        <div className='flex flex-col gap-4 px-4  pt-3 pb-5 overflow-y-auto py-10'>
            {
                messages.map(message => {
                    return (
                        <div key={message.id} className={cn('flex pb-3', {
                            'justify-end ': message.role === 'user',
                            'justify-start max-w-[90%]': message.role === 'assistant'
                        })}>

                            <div className={
                                cn("rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10 max-w-[90%]", {
                                    'bg-[#5900F2] text-white': message.role === 'user',
                                })
                            }>
                                <p>{message.content}</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default MessageList