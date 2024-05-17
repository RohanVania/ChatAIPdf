import { db } from '@/lib/db';
import { chatPdf } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import ChatSideBar from "@/components/ChatSideBar"
import ChatPdfViewer from '@/components/ChatPdfViewer';
import ChatComponent from '@/components/ChatComponent';

type Props = {
  params: {
    chatid: any
  }
}

async function Chat({ params }: Props) {

  //* This will be the authentication Id using some authentication eg clerk,
  const userId = true;
  if (!userId) {
    return redirect("/error")
  }


  const chats = await db.select().from(chatPdf).where(eq(chatPdf.userId, "3781c069-fe4e-4312-a21c-93bba06e66fa"));
  // console.log("Pdf Id For a Particualar Document",chats)

  /** Chats is an array, if we cant find anything return to home */
  if (chats.length <= 0) {
    return redirect("/")
  }


  //TODO Later Change ChatPdf for particular User
  const allChatPdfForGivenUser = await db.select().from(chatPdf);

  return (
    <section className=' max-h-screen w-full  relative  h-screen overflow-y-auto '>
      <div className='w-full h-full  flex max-h-screen  '>

        {/* Chat Side Bar */}
        <div className='h-full  max-h-scree '>
          <ChatSideBar allChatPdfForGivenUser={allChatPdfForGivenUser} chatId={chats[0].id} />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-evenly flex-wrap  gap-[10px]  overflow-y-hidde h-full'>

          <div className='  w-full max-w-[810px] max-h-full'>
            <ChatPdfViewer pdf_url={'https://chatpdf-rohan.s3.amazonaws.com/uploads/1715788287423MyTinyGuidetoShadcn,Radix,andTailwind_byMairajPirzada_Medium.pdf'} />
          </div>

          {/* Chat Component */}
          <div className='  max-w-[768px]  w-full whitespace-normal break-words h-ful max-h-[460px] 2xl:max-h-full   '>
            <ChatComponent chatid={chats[0].id} />
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