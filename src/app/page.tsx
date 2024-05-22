"use client"
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  return (
    <>

      <div className="w-full px-2   min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="flex flex-col">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold">Chat with any PDF</h1>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6 mb-2">
            <Button onClick={()=>router.push("/chat")}>Go to Chats</Button>
            <Button onClick={()=>router.push("/extra")} >Manage Subscription</Button>
          </div>
          <p className="max-w-xl text-center mt-4 text-sm sm:text-lg text-slate-600">
            Join millions of students, researchers and professionals to instantly answer questions and understand research with AI
          </p>
          <FileUpload/>
        </div>

      </div>


    </>
  );
}
