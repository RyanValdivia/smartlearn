import NextAuth from "next-auth";
import { authOptions } from "../../../../core/server/auth/index";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
