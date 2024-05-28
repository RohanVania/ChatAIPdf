"use client"
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logo from "../../public/download.png"

export default function Home() {
  const router=useRouter();
  return (
    <>

      <div className="w-full px-2   min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="flex flex-col">
          <div className="text-center flex gap-5 flex-wrap  items-center justify-center">
            <div className="w-[70px] aspect-square  rounded-lg overflow-hidden " onClick={()=>{router.push("/")}}>
              <Image src={logo} alt="logo-pdf" className="rounded-lg w-full h-full "/>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold">Chat with any PDF</h1>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6 mb-2  items-center">
            <Button onClick={()=>router.push("/chat")}>Go to Chats</Button>
            <Button onClick={()=>router.push("/extra")} >Manage Subscription</Button>
            <div className="w-[52px] aspect-square bg-blue-400 rounded-full overflow-hidden">
              <Image src="https://avatars.githubusercontent.com/u/139475519" className="object-cover bg-top" alt="Person-Image" width={52} height={52}/>
            </div>
          </div>
          <p className="max-w-xl text-center mt-4 text-sm sm:text-lg text-slate-600 mb-6">
            Join millions of students, researchers and professionals to instantly answer questions and understand research with AI
          </p>
          <FileUpload/>
        </div>

      </div>


    </>
  );
}
