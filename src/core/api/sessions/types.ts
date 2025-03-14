import { type z } from "zod";
import { type sessionSchema } from "./schemas";
import { type APIResponse } from "..";

export type Session = z.infer<typeof sessionSchema>;

export type GetByTokenSessionParams = {
    token: string;
};

export type SessionAPI = {
    getByToken(params: GetByTokenSessionParams): Promise<APIResponse<Session>>;
};
