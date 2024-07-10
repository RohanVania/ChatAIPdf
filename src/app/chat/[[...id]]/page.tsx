import { db } from '@/lib/db';
import { DrizzleChatPDF, chatPdf, users } from '@/lib/db/schema';
import { redirect } from 'next/navigation';
import ChatSideBar from "@/components/ChatSideBar"
import ChatPdfViewer from '@/components/ChatPdfViewer';
import ChatComponent from '@/components/ChatComponent';
import axios from 'axios';
import { Routes } from '@/lib/routes';
import FileUpload from '@/components/FileUpload';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/options';

type Props = {
  params: {
    id: any
  }
}

async function getData(userid: string,providername:string) {
  const res = await axios.post(Routes.getpdfData, {
    userid: userid,
    provider:providername
  }
  );
  return res.data.res as DrizzleChatPDF[]
}


async function Chat({ params }: Props) {

  //* This will be the authentication Id using some authentication eg clerk,  
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("You are not allowed to see this page");
    redirect("/")
  }

  const userId = session?.user.id;
  const providername=session?.user.provider;
  if (!userId) {
    return redirect("/signIn")
  }

  const AllpdfForAUser = await getData(userId as string,providername as string);

  if (params?.id?.length > 1) {
    return redirect("/error")
  }

  const id = params?.id

  let activePdf;
  if (!params.id) {
    activePdf = null
  }

  else {
    activePdf = AllpdfForAUser.find((chat: DrizzleChatPDF) => chat.id === parseInt(params?.id[0]));
  }


  return (
    <section className=' max-h-screen w-full  relative  h-screen overflow-y-auto '>
      <div className='w-full h-full  flex    relative'>

        {/* Chat Side Bar */}
        <div className='h-full flex-1  max-h-scree absolute lg:relativ z-40 '>
          <ChatSideBar
            allChatPdfForGivenUser={AllpdfForAUser}
            activePdfId={activePdf?.id}
          />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-between chatbar-wrap:justify-center flex-col flex-wrap pdfwrap:flex-row pdfwrap:flex-wrap   gap-x-[50px]  overflow-y-aut h-full '>

          <div className='  w-full max-w-[810px] max-h-full  mx-auto  h-[400px] pdfwrap:h-full '>
            {
              !id ?
                <FileUpload classname='h-[100%] ' />
                :
                 <ChatPdfViewer pdf_url={activePdf?.pdfUrl} />
            }
          </div>

          {/* Chat Component */}
          <div className='  flex-1 w-full whitespace-normal break-words h-full max-h-screen   chatbar-wrap:max-h-[440px] overflow-y-hidden'>
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
