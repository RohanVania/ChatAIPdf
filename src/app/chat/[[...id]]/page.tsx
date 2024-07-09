import { db } from '@/lib/db';
import { DrizzleChat, chatPdf, users } from '@/lib/db/schema';
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

async function getData(userid: string) {
  const res = await axios.post(Routes.getpdfData, {
    userid: userid
  }
  );
  return res.data.res as DrizzleChat[]
}


async function Chat({ params }: Props) {

  //* This will be the authentication Id using some authentication eg clerk,  
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("You are not allowed to see this page");
    redirect("/")
  }

  const userId = session?.user.id;
  if (!userId) {
    return redirect("/signIn")
  }

  const AllpdfForAUser = await getData(userId as string);

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
      <div className='w-full h-full  flex    relative'>

        {/* Chat Side Bar */}
        <div className='h-full flex-1  max-h-scree absolute lg:relative z-40 '>
          <ChatSideBar
            allChatPdfForGivenUser={AllpdfForAUser}
            activePdfId={activePdf?.id}
          />
        </div>

        {/* Chat Pdf Viewer */}
        <div className='flex w-full justify-between chatbar-wrap:justify-center flex-wrap  gap-x-[50px]  overflow-y-hidde h-full '>

          <div className='  w-full max-w-[810px] max-h-full bg-red-40 mx-auto  h-[500px'>
            {
              !id ?
                <FileUpload classname='h-[100%] ' />
                : <ChatPdfViewer pdf_url={activePdf?.pdfUrl} />
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
