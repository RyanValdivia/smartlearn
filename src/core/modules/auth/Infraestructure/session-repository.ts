import {
    type GetByTokenSessionParams,
    type Session,
} from "@/core/api/sessions/types";
import { type ISessionsRepository } from "../Domain/session-repository";
import { db } from "@@/drizzle/client";
import { sessionsTable } from "@@/drizzle/schemas/auth";
import { eq } from "drizzle-orm";

export class SessionsRepository implements ISessionsRepository {
    async findByToken(
        params: GetByTokenSessionParams,
    ): Promise<Session | null> {
        const [session] = await db
            .select()
            .from(sessionsTable)
            .where(eq(sessionsTable.sessionToken, params.token));

        return session;
    }
}
