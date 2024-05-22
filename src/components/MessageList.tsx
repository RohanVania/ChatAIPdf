"use client"

import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'

type Props = {
    messages: Message[],
}

const MessageList = ({ messages }: Props) => {

    if (!messages) return <></>

    

    return (
        <div className='flex flex-col gap-4 px-4  pt-3 pb-5 overflow-y-auto py-10'>
            {
                messages.map(message=>{
                    return (
                        <div key={message.id} className={cn('flex pb-3',{
                            'justify-end ':message.role ==='user',
                            'justify-start max-w-[90%]':message.role==='assistant'
                        })}>

                            <div className={
                                cn("rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10 max-w-[90%]",{
                                    'bg-[#5900F2] text-white':message.role ==='user',
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