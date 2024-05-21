import { db } from '@/lib/db';
import { chatPdf, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import ChatSideBar from "@/components/ChatSideBar"
import ChatPdfViewer from '@/components/ChatPdfViewer';
import ChatComponent from '@/components/ChatComponent';
import {sql} from "drizzle-orm"


type Props = {
  params: {
    id: any
  }
}

async function Chat({ params }: Props) {

  console.log("Params =>", params);

  if (params?.id?.length > 1) {
    return redirect("/error")
  }



  //* This will be the authentication Id using some authentication eg clerk,
  const userId = true;
  if (!userId) {
    return redirect("/error")
  }


  

  let allPdfOfUser = await db.query.chatPdf.findMany();
  console.log("Pdf s =>",allPdfOfUser);

  let activePdf=allPdfOfUser.find((chat)=>chat.id === parseInt(params.id[0]));
  console.log("Active Pdf =>",activePdf);

  /** Chats is an array, if we cant find anything return to home */
  // if (chats.length <= 0) {
  //   return redirect("/")
  // }


  //TODO Later Change ChatPdf for particular User
  const allChatPdfForGivenUser = await db.select().from(chatPdf);

  return (
    <section className=' max-h-screen w-full  relative  h-screen overflow-y-auto '>
      <div className='w-full h-full  flex max-h-screen  relative'>

        {/* Chat Side Bar */}
        <div className='h-full  max-h-scree absolute lg:relative z-40'>
          <ChatSideBar
          allChatPdfForGivenUser={allPdfOfUser} 
          activePdfId={activePdf?.id}
          />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-between flex-wrap  gap-x-[50px]  overflow-y-hidde h-full'>

          <div className='  w-full max-w-[810px] max-h-full bg-red-400'>
            <ChatPdfViewer pdf_url={activePdf?.pdfUrl } />
          </div>

          {/* Chat Component */}
          <div className='  max-w-[768px flex-1 w-full whitespace-normal break-words h-ful max-h-[472.px] lg:max-h-[99.4%]   '>
            <ChatComponent
              activeId={activePdf?.id}
            // chatid={chats[0].id} 
            />
          </div>
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