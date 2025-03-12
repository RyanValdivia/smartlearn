import { withAuth } from "next-auth/middleware";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {},
    {
        callbacks: {
            authorized: ({ req }) => {
                console.log(req);
                return true;
            },
        },
    },
);

export const config = { matcher: ["/:path*"] };
