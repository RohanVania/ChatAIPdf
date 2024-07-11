"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import {  Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import React from 'react'

type Props = {
    children: React.ReactNode;
    session:Session | null ;
}

const queryclient = new QueryClient({
});

const Providers = ({ children,session }: Props) => {
    console.log("Session in Provider",session)
    return (

        <QueryClientProvider client={queryclient}>
            <SessionProvider session={session} >
                {
                    children
                }
            </SessionProvider >
        </QueryClientProvider>

    )

}


export default Providers;
