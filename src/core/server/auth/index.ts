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

import { redirect } from "next/navigation";
import { ROUTES } from "@/core/routes";
import { getSessionTokenCookie } from "./utils";
import { cookies } from "next/headers";
import { logger } from "@/core/logger";
import prisma from "@@/prisma/seed";
import { db } from "../db";
import { type Session, UserRole } from "@prisma/client";
import { AuthController } from "@/core/modules/auth/Application/Controllers/auth-controller";
import { CustomPrismaAdapter } from "./custom-adapter";
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
    export interface AdapterUser extends SessionUser {}
    export interface AdapterSession extends Session {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authController = new AuthController();
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
    adapter: CustomPrismaAdapter(prisma),
    callbacks: {
        async signIn({ user, account }) {
            console.log(account);
            return await authController.signIn(user.email, account!);
        },
        async session({ session, user, trigger, newSession }) {
            const sessionToken = getSessionTokenCookie(await cookies());

            if (!sessionToken) {
                logger.error("Session token not found");
                session.error = "SessionTokenNotFound";

                return session;
            }

            const s = await db.session.findUnique({
                where: {
                    sessionToken,
                },
            });

            if (!s) {
                logger.error("Session not found");
                session.error = "SessionTokenNotFound";

                return session;
            }
            const accessibleRoles = roleAccessMap[user.role];

            session.own = {
                ...session.own,
                accesibleRoles: accessibleRoles,
                cycleId: s.cycleId,
                sessionToken,
                userId: user.id,
                sessionRole: s.sessionRole,
            } satisfies OwnSession;

            if (trigger === "update" && newSession) {
                const updatePayload = newSession as UpdateSessionPayload;

                if (updatePayload.type === "ACCESS") {
                    const role = updatePayload.access;

                    const updatedSession = await db.session.update({
                        where: {
                            sessionToken,
                        },
                        data: {
                            sessionRole: role,
                        },
                    });

                    session.own = {
                        ...session.own,
                        sessionRole: updatedSession.sessionRole,
                    };
                    return session;
                }

                if (updatePayload.type === "CYCLE") {
                    const cycleId = updatePayload.cycleId;

                    const updatedSession = await db.session.update({
                        where: {
                            sessionToken,
                        },
                        data: {
                            cycleId: cycleId,
                        },
                    });

                    session.own = {
                        ...session.own,
                        cycleId: updatedSession.cycleId,
                    };
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

export const isAdminServerAuthSession = async () => {
    const session = await getServerAuthSession();
    if (!session) {
        return false;
    }
    if (session.own.sessionRole !== UserRole.ADMIN) {
        return false;
    }
    return true;
};

export async function getSession() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect(ROUTES.login);
    }

    return session;
}
