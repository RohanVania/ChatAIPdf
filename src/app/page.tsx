import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>

      <div className="w-full px-2   min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="flex flex-col">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold">Chat with any PDF</h1>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6 mb-2">
            <Button>Go to Chats</Button>
            <Button>Manage Subscription</Button>
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
