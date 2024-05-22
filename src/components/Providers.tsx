"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const queryclient = new QueryClient({
});

const Providers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryclient}>
            {
                children
            }
        </QueryClientProvider>

    )
}

export default Providers;