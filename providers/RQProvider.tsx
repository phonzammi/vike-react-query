import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function RQProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false
            },
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}