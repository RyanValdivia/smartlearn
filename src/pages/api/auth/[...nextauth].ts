import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@@/drizzle/client";
import {
    accountsTable,
    sessionsTable,
    usersTable,
    verificationTokensTable,
} from "@@/drizzle/schemas/auth";
import { getInjection } from "@/core/di/container";

const authService = getInjection("IAuthService");

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
                if (!credentials) {
                    return null;
                }

                return authService.logIn({
                    password: credentials.password,
                    dni: credentials.username,
                });
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
        async signIn({ user }) {
            return !authService.userAlreadyExists(user.email || "");
        },
    },
} as NextAuthOptions;

export default NextAuth(authOptions);
