import { type Session } from "@/core/api/session";
import { type ISessionsRepository } from "../../auth/Domain/session-repository";
import { db } from "@@/drizzle/client";
import { sessionsTable } from "@@/drizzle/schemas/auth";
import { eq } from "drizzle-orm";

export class SessionsRepository implements ISessionsRepository {
    async findByToken(token: string): Promise<Session | null> {
        const [session] = await db
            .select()
            .from(sessionsTable)
            .where(eq(sessionsTable.sessionToken, token));

        return session;
    }
}
