"use client"
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logo from "../../public/download.png"
import { signOut, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data, status);

  const [showDropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to dropdown element

  const toggleDropDown = () => {
    setDropdown(!showDropdown)
  }

  // Function to close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) {
      setDropdown(false);
    }
  };

  // Attach click event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full px-2   min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="flex flex-col">
          <div className="text-center flex gap-5 flex-wrap  items-center justify-center">
            <div className="w-[70px] aspect-square  rounded-lg overflow-hidden " onClick={() => { router.push("/") }}>
              <Image src={logo} alt="logo-pdf" className="rounded-lg w-full h-full " />
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold">Chat with any PDF</h1>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6 mb-2  items-center">
            <Button onClick={() => router.push("/chat")}>Go to Chats</Button>
            <Button onClick={() => router.push("/extra")} >Manage Subscription</Button>
            {status === 'authenticated' &&
              <div className="relative z-[100]">
                <div className="w-[52px] aspect-square   top-0  rounded-full overflow-hidden ml-4 cursor-pointer" onClick={toggleDropDown}>
                  <Image src={data?.user?.image as string} className="object-cover bg-top" alt="Person-Image" width={52} height={52} />
                </div>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="bg-slate-200  px-4 py-2 cursor-pointer  absolute top-[46px] smallnavigation:left-[0px] left-  w-[110px] text-center"
                    onClick={()=>{signOut()}}
                    >
                    <p className="text-black "> Sign Out</p>
                  </div>
                )}
              </div>
            }
          </div>
          <p className="max-w-xl text-center mt-4 text-sm sm:text-lg text-slate-600 mb-6 pt-3">
            Join millions of students, researchers and professionals to instantly answer questions and understand research with AI
          </p>
          <FileUpload />
        </div>

      </div>

    </>
  );
}
