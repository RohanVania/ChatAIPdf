"use client"
import { signIn, useSession } from "next-auth/react"
import { providerMap } from "@/app/api/auth/[...nextauth]/options"
import { useSearchParams } from 'next/navigation'
import Image from "next/image"


type Props = {}

const Page = (props: Props) => {
    // console.log(useSession())
    const searchParams = useSearchParams();
    console.log("SEARCH PARAMS",searchParams)

    return (
        <div className="py-4 px-4  absolute w-full top-[50%] translate-y-[-50%]">
            <div className="flex  bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover aspect-video" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}>
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    {
                        providerMap.map((provider) => {
                            console.log("Provider =>",provider)
                            return <button key={provider?.id} onClick={() => signIn(provider?.id, {
                                // callbackUrl:'http://localhost:3000'
                                // callbackUrl: "/"
                                callbackUrl: searchParams.get("callbackUrl")!
                            }
                            )} className="flex items-center justify-center mt-6 text-white rounded-lg shadow-md hover:bg-gray-100 w-full ">
                                <div className="flex items-center">
                                    <div className="px-2 py-  ">
                                        <Image alt="logo" src={`https://authjs.dev/img/providers${provider?.style?.logo}`}  width={1000} height={1000} className="w-[27px] aspect-square" />
                                    </div>
                                    <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with {provider?.name}</h1>
                                </div>
                            </button>
                        })
                    }

                    {/* <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                        </div>
                        <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
                    </div>
                    <div className="mt-8">
                        <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
                    </div> */}
                    {/* <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <a href="#" className="text-xs text-gray-500 uppercase">or sign up</a>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Page