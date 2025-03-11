import { type ZodFetcher } from "zod-fetch";
import { type AppRouter, initClient } from "@ts-rest/core";
import type { TypedClient } from "@/utils/types";
import { type z } from "zod";

export type APIAccessorParams = {
    apiUrl: string;
    fetcher?: ZodFetcher<typeof fetch>;
};

export class APIAccessor<T extends AppRouter> {
    public _client: TypedClient<T>;
    public apiUrl: string;
    public _apiUrl: string;

    constructor({ apiUrl, router }: APIAccessorParams & { router: T }) {
        this.apiUrl = apiUrl;
        this._apiUrl = apiUrl;

        this._client = initClient(router, {
            baseUrl: this.apiUrl,
        });
    }
}
type IsNullableOrOptional<T> = null extends T
    ? true
    : undefined extends T
      ? true
      : false;
type IsNullable<T> = null extends T ? true : false;
type IsOptional<T> = undefined extends T ? true : false;
type ExtendedZodType<T extends z.ZodType, V> =
    | T
    | z.ZodEffects<T, V, V>
    | z.ZodLazy<T>;

export type ZodInferSchema<T extends object> = {
    [Key in keyof T]-?: IsNullableOrOptional<T[Key]> extends true
        ? IsNullable<T[Key]> extends true
            ? IsOptional<T[Key]> extends true
                ? ExtendedZodType<
                      z.ZodOptional<z.ZodNullable<z.ZodType<T[Key]>>>,
                      T[Key]
                  >
                : ExtendedZodType<z.ZodNullable<z.ZodType<T[Key]>>, T[Key]>
            : IsOptional<T[Key]> extends true
              ? ExtendedZodType<z.ZodOptional<z.ZodType<T[Key]>>, T[Key]>
              : ExtendedZodType<z.ZodType<T[Key]>, T[Key]>
        : ExtendedZodType<z.ZodType<T[Key]>, T[Key]>;
};

export type SimpleAPIResponse = {
    message: string;
};
