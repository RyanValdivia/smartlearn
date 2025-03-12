import { db } from "@@/drizzle/client";
import { sessionsTable, UserRole } from "@@/drizzle/schemas/auth";
import { eq } from "drizzle-orm";
import { withAuth } from "next-auth/middleware";
// import { cookies } from "next/headers";
// import { getSessionTokenCookie } from "./core/server/auth/utils";
//TODO implements JWT
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function middleware(req) {},
    {
        callbacks: {
            authorized: async ({ req }) => {
                const sessionToken = req.cookies.get(
                    "next-auth.session-token",
                )?.value;
                // const sessionToken = getSessionTokenCookie(await cookies());
                if (!sessionToken) {
                    return false;
                }
                const s = await db.query.sessionsTable.findFirst({
                    where: eq(sessionsTable.sessionToken, sessionToken),
                });
                console.log("s", s);
                return true;
            },
        },
    },
);

export const config = {
    matcher: ["/:path*"],
    runtime: "nodejs", // Fuerza el uso de Node.js en lugar de Edge Runtime
};
