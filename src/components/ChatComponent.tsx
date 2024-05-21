"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import {useChat} from "ai/react"
import MessageList from './MessageList'
import { RiSendPlaneFill } from "react-icons/ri";
import { cn } from '@/lib/utils'


type Props = {
  activeId?:number
}

const ChatComponent = ({activeId}: Props) => {
    const {input,handleInputChange,handleSubmit,messages}=useChat({
    api:'/api/chat',
    body:{
      chatid:activeId
    }
  });

  
  return (
    <div className='relative  overflow-y-hidden h-full max-h-full'>

      {/* Header */}
      <div className='sticky top-0 md:text-left text-center inset-x-0 p-2 bg-white h-fit mb-2'>
        <h3 className='text-xl font-semibold'>PDF CHAT</h3>
      </div>

      {/* Message List */}
      <div
        className={cn("max-h-full overflow-y-auto ",{
          "pb-[90px]":messages.length >0
        })}
      >
        <MessageList messages={messages}/>
      </div>

      <form className='flex w-full space-x-2 sticky bottom-[0px] md:bottom-[-1px] inset-x-0 px-2 py-3  bg-white z-30 ' onSubmit={handleSubmit} >
        <Input type="text" value={input} onChange={handleInputChange} placeholder="Ask anything about the PDF" className='w-full' />
        <Button type="submit" className='flex items-center gap-x-2'>
          <p className=''>Send</p>
          <RiSendPlaneFill className='self-center text-md ' /></Button>
      </form>

    </div>
  )
}

export default ChatComponent;