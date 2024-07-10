"use client"
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useChat } from "ai/react"
import MessageList from './MessageList'
import { RiSendPlaneFill } from "react-icons/ri";
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, usePathname } from 'next/navigation'

type Props = {
  activeId?: number
}

const callToMessagesApi = async (chatid: number) => {
  try {
    const apiresult = await fetch('http://localhost:3000/api/getMessages', {
      method: 'POST',
      body: JSON.stringify({ chatid: chatid }),
    })
    const apiResultMessages = await apiresult.json()
    // console.log("Messages", apiResultMessages);
    return apiResultMessages;
  } catch (err) {
    console.log("Error in Calling Get Message API ", err);
    throw err;
  }
}

const ChatComponent = ({ activeId }: Props) => {

  const pathname = usePathname()
  const searchparams = useSearchParams();

  //* Function to get Messages stored in db 
  const { data, isLoading } = useQuery({
    queryKey: ["chat", activeId],
    queryFn: async () => {
      const previousMessages = await callToMessagesApi(activeId as number)
      return previousMessages?.messagesforPdf
    },
  })

  // console.log("Previous Messages =>", data);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat',
    body: {
      chatid: activeId
    },
    initialMessages: data || [],
    onError: (err) => {
      toast.error("Something went wrong ! Try later", { id: "error-chat" });
    }
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  return (
    <div className='relative  overflow-y-hidden h-full max-h-ful '>

      {/* Header */}
      <div className='sticky top-0 md:text-left text-center inset-x-0 p-2 bg-white h-fit mb-1 z-10'>
        <h3 className='text-xl font-semibold'>PDF CHAT</h3>
      </div>

      {/* Message List */}
      {
        messages.length > 0 &&
        <div
          id={'message-container'}
          className={cn("max-h-full overflow-y-auto  relative", {
            "pb-[90px]": messages.length > 0,
            "relative": ""
          })}
        >
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
      }
      {
        pathname === '/chat' && searchparams.size == 0 ?
          <h1 className=' ml-2 text-lg font-medium'>Nothing to chat</h1>
          :
          <form className='flex w-full space-x-2 sticky bottom-[0px] md:bottom-[-1px] inset-x-0 px-2 py-3  bg-white z-30 ' onSubmit={handleSubmit} >
            <Input type="text" value={input} onChange={handleInputChange} placeholder="Ask anything about the PDF" className='w-full' />
            <Button type="submit" className='flex items-center gap-x-2'>
              <p className=''>Send</p>
              <RiSendPlaneFill className='self-center text-md ' /></Button>
          </form>
      }

    </div>
  )
}

export default ChatComponent;