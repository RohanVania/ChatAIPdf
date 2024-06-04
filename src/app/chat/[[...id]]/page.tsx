import { db } from '@/lib/db';
import { DrizzleChat, chatPdf, users } from '@/lib/db/schema';
import { redirect } from 'next/navigation';
import ChatSideBar from "@/components/ChatSideBar"
import ChatPdfViewer from '@/components/ChatPdfViewer';
import ChatComponent from '@/components/ChatComponent';
import axios from 'axios';
import { Routes } from '@/lib/routes';
import FileUpload from '@/components/FileUpload';

type Props = {
  params: {
    id: any
  }
}


async function getData(userid: string) {
  const res = await axios.post(Routes.getpdfData, {
    userid: "1234"
  }
  );
  return res.data.res as DrizzleChat[]
}


async function Chat({ params }: Props) {
  console.log("Params =>", params);

  //* This will be the authentication Id using some authentication eg clerk,  
  const userId = true;
  if (!userId) {
    return redirect("/error")
  }

  const AllpdfForAUser = await getData("1234");

  if (params?.id?.length > 1) {
    return redirect("/error")
  }

  const id = params?.id

  let activePdf;
  if (!params.id) {
    activePdf = null
  }
  
  else {
    activePdf = AllpdfForAUser.find((chat: DrizzleChat) => chat.id === parseInt(params?.id[0]));
  }

  
  return (
    <section className=' max-h-screen w-full  relative  h-screen overflow-y-auto '>
      <div className='w-full h-full  flex max-h-screen  relative'>

        {/* Chat Side Bar */}
        <div className='h-full  max-h-scree absolute lg:relative z-40'>
          <ChatSideBar
            allChatPdfForGivenUser={AllpdfForAUser}
            activePdfId={activePdf?.id}
          />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-between chatbar-wrap:justify-center flex-wrap  gap-x-[50px]  overflow-y-hidde h-full '>

          <div className='  w-full max-w-[810px] max-h-full bg-red-40 mx-auto'>
            { 
              !id ? 
              <FileUpload classname='h-[100%]' />
              : <ChatPdfViewer pdf_url={activePdf?.pdfUrl} /> 
            }
          </div>

          {/* Chat Component */}
          <div className='  flex-1 w-full whitespace-normal break-words h-ful max-h-[99.4%]   chatbar-wrap:max-h-[440px]'>
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
