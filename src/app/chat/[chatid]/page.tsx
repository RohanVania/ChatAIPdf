import { db } from '@/lib/db';
import { chatPdf } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import ChatSideBar from "@/components/ChatSideBar"
import ChatPdfViewer from '@/components/ChatPdfViewer';

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
  console.log(chats)

  /** Chats is an array, if we cant find anything return to home */
  if (chats.length <= 0) {
    return redirect("/")
  }

  console.log(chats[0].id)

  //TODO Later Change ChatPdf for particular User
  const allChatPdfForGivenUser = await db.select().from(chatPdf);




  return (
    <section className=' max-h-screen w-full  relative  h-screen '>
      <div className='w-full h-full max-h-scree flex '>

        {/* Chat Side Bar */}
        <div className='h-full  max-h-screen '>
          <ChatSideBar allChatPdfForGivenUser={allChatPdfForGivenUser} chatId={chats[0].id} />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-evenly flex-wrap  gap-[10px] max-h-screen overflow-y-auto'>

          <div className='bg-amber-600  w-[968px w-full max-w-[810px]'>
            <ChatPdfViewer pdf_url={''} />
          </div>

          {/* Chat Component */}
          <div className='bg-violet-400 flex-[1 max-w-[768px] md:w-[700px w-full whitespace-normal break-words h-ful overflow-y-auto '>
         

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