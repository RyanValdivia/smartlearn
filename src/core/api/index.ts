import { createZodFetcher } from "zod-fetch";
import { type APIAccessorParams } from "./types";
import { UserClass } from "./users/api";

export class APIClass {
    private _params: APIAccessorParams;
    constructor(private _apiUrl: string) {
        this._params = {
            apiUrl: this._apiUrl,
            fetcher: zodFetcher,
        };
    }

    get users() {
        return new UserClass(this._params);
    }
}

const defaultFetcher = async (...args: Parameters<typeof fetch>) => {
    const response = await fetch(...args);
    if (!response.ok) {
        const json = (await response.json()) as APIResponse<unknown>;
        throw new APIError(json.message);
    }

    return response.json();
};
export const zodFetcher = createZodFetcher(defaultFetcher);

export type APIPaginationResponse<D> = {
    response: PaginationResponse<D>;
    message: string;
};

export type APIResponse<D> = {
    data: D;
    message: string;
};

export type PaginationResponse<D> = {
    data: D;
    total: number;
};

export class APIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APIError";
    }
}
