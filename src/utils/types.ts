import {
    type AppRoute,
    type AppRouteFunction,
    type ClientArgs,
    type AppRouter,
    type InitClientArgs,
} from "@ts-rest/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function enumToPgEnum<T extends Record<string, any>>(
    myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
    return Object.values(myEnum).map((value: any) => `${value}`) as any;
}
export type TypedClient<
    T extends AppRouter,
    TClientArgs extends InitClientArgs = InitClientArgs,
> = RecursiveProxyObj<T, TClientArgs>;

type RecursiveProxyObj<T extends AppRouter, TClientArgs extends ClientArgs> = {
    [TKey in keyof T]: T[TKey] extends AppRoute
        ? AppRouteFunction<T[TKey], TClientArgs>
        : T[TKey] extends AppRouter
          ? RecursiveProxyObj<T[TKey], TClientArgs>
          : never;
};

export type TypedAppRouter<T> = {
    [key in keyof Omit<T, "_client">]: AppRouter | AppRoute;
};

export type PaginationParams<T> = T & {
    page: number;
};
