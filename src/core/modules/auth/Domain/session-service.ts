import { type Session } from "@/core/api/session";

export interface ISessionsService {
    findByToken(token: string): Promise<Session | null>;
}
