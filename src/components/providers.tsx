"use client";
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { reactQueryConfig } from "@/core/react-query";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import { AppProvider } from "@/core/app-context";
import { logger } from "@/core/logger";

export default function Providers({ children }: React.PropsWithChildren) {
    const [queryClient] = React.useState(() => {
        return new QueryClient({
            ...reactQueryConfig,
            queryCache: new QueryCache({
                onError: (error) => {
                    if (error instanceof SyntaxError) {
                        logger.error(error);
                        logger.error(
                            "Error del cliente, respuesta desconocida",
                        );

                        toast.error("Error", {
                            description: "Error inesperado",
                            icon: <XIcon />,
                        });
                    } else {
                        toast.error("Error", {
                            description: error.message,
                            icon: <XIcon />,
                        });
                    }
                },
            }),
            mutationCache: new MutationCache({
                onError: (error) => {
                    if (error instanceof SyntaxError) {
                        logger.error(error);
                        logger.error(
                            "Error del cliente, respuesta desconocida",
                        );

                        toast.error("Error", {
                            description: "Error inesperado",
                            icon: <XIcon />,
                        });
                    } else {
                        toast.error("Error", {
                            description: error.message,
                            icon: <XIcon />,
                        });
                    }
                },
            }),
        });
    });

    return (
        <SessionProvider refetchOnWindowFocus={false}>
            <QueryClientProvider client={queryClient}>
                <AppProvider>{children}</AppProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </SessionProvider>
    );
}
