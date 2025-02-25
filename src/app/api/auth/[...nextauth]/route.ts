import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        signIn(params) {
            console.log("signIn", params);
            return true;
        },
    }
} as AuthOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };