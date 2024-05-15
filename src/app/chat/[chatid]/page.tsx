import { db } from '@/lib/db';
import { chatPdf } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'
import ChatSideBar from "@/components/ChatSideBar"

type Props = {
  params: {
    chatid: any
  }
}

async function Chat({ params }: Props) {

  //* This will be the authentication Id
  const userId = true;
  if (!userId) {
    return redirect("/error")
  }


  const chats = await db.select().from(chatPdf).where(eq(chatPdf.userId,"f3312488-2e4f-44c4-b2da-2e68a0268aca"));
  console.log(chats)

  /** Chats is an array, if we cant find anything return to home */
  if (chats.length <= 0) {
    return redirect("/")
  }

  return (
    <section className=' min-h-screen w-full'>
      
      <div className='w-full h-full flex'>
        {/* Chat Side Bar */}
        <div>
          <ChatSideBar/>
        </div>
        {/* Chat Viewer */}
        <div>
          {/* <ChatViewer/> */}
          ChatPdf Display
        </div>
        {/* Chat Section */}
        <div>
          {/* <ChatComponent/> */}
          Chat Section
        </div>

      </div>


    </section>
  )
}

export default Chat
// <div>
//     {params.chatid}
//   <div>
//     SideBar
//   </div>
//   <div>
//     ChatPdf Display
//   </div>
//   <div>
//     Chat Section
//   </div>