import type { QueryClientConfig } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Middleware, MutationHook } from "react-query-kit";

export const mutationMiddleware: Middleware<MutationHook> = (
    useMutationNext,
) => {
    return (options, queryClient) => {
        const router = useRouter();

        return useMutationNext(
            {
                ...options,
                onSuccess: async (response, variables, context) => {
                    console.log({ response });

                    options.onSuccess?.(response, variables, context);

                    const mutationKey = options.mutationKey;
                    await queryClient?.invalidateQueries({
                        queryKey: mutationKey,
                    });
                    queryClient?.removeQueries({ queryKey: mutationKey });

                    router.refresh();
                },
            },
            queryClient,
        );
    };
};

export const reactQueryConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
        mutations: {
            // react-query-kit use this field for middleware purposes
            // cannot redeclare with declare module
            use: [mutationMiddleware],
        },
    },
} as QueryClientConfig;
