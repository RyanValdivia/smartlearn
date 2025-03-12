import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import React from "react";
import {
    roleAccessMap,
    type UpdateSessionPayload,
    type OwnSession,
    type SessionUser,
} from "./types";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
    accountsTable,
    sessionsTable,
    type UserRole,
    usersTable,
    verificationTokensTable,
} from "@@/drizzle/schemas/auth";
import { getInjection } from "@/core/di/container";
import { type Session } from "../../api/session";
import { redirect } from "next/navigation";
import { ROUTES } from "@/core/routes";
import { db } from "@@/drizzle/client";
import { eq } from "drizzle-orm";
import { getSessionTokenCookie } from "./utils";
import { cookies } from "next/headers";
import { logger } from "@/core/logger";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: AdapterUser;
        error?:
            | "RefreshAccessTokenError"
            | "NotFoundAccountError"
            | "InvalidUpdateSessionPayload"
            | "UpdateSessionError"
            | "SessionTokenNotFound";
        own: OwnSession;
    }
}

declare module "next-auth/adapters" {
    interface AdapterUser extends SessionUser {}
    interface AdapterSession extends Session {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authController = getInjection("AuthController");
//TODO SESSION TIME OUT
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                return authController.logIn(credentials);
            },
        }),
    ],
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
    }),
    callbacks: {
        async signIn({ user, account }) {
            return await authController.signIn(user.email, account!);
        },
        async session({ session, user, trigger, newSession }) {
            const sessionToken = getSessionTokenCookie(await cookies());

            if (!sessionToken) {
                logger.error("Session token not found");
                session.error = "SessionTokenNotFound";

                return session;
            }

            const s = await db.query.sessionsTable.findFirst({
                where: eq(sessionsTable.sessionToken, sessionToken),
            });

            const accessibleRoles = roleAccessMap[user.role];

            session.own = {
                ...session.own,
                accesibleRoles: accessibleRoles,
                cycleId: s?.cycleId || 0,
                sessionToken,
                userId: user.id,
                sessionRole: s?.sessionRole || null,
            } satisfies OwnSession;

            if (trigger === "update" && newSession) {
                const updatePayload = newSession as UpdateSessionPayload;

                if (updatePayload.type === "ACCESS") {
                    const role = updatePayload.access;

                    const updatedSession: {
                        sessionRole: UserRole | null;
                    }[] = await db
                        .update(sessionsTable)
                        .set({
                            sessionRole: role,
                        })
                        .where(eq(sessionsTable.sessionToken, sessionToken))
                        .returning({
                            sessionRole: sessionsTable.sessionRole,
                        });

                    session.own = {
                        ...session.own,
                        sessionRole: updatedSession[0].sessionRole,
                    };
                    //TODO UPDATE CYCLEID
                    //TODO UPDATE USERID
                    return session;
                }
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // signIn: "/",
    },
} as NextAuthOptions;

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = React.cache(() =>
    getServerSession(authOptions),
);

export async function getSession() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect(ROUTES.login);
    }

    return session;
}
