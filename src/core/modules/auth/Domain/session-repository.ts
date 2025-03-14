import { type Session } from "@/core/api/session";

export interface ISessionsRepository {
    findByToken(token: string): Promise<Session | null>;
}
