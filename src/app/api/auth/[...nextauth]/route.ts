import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getInjection } from "../../../../../di/container";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({user}) {
            const authService = getInjection("IAuthService");
            const userReturned = await authService.signIn({
                image: user.image,
                name: user.name!,
                email: user.email!,
                role: "STUDENT"
            });

            console.log("signIn", userReturned);

            return true;
        },
    }
} as AuthOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };