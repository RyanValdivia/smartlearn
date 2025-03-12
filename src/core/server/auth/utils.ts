import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getSessionTokenCookie(cookies: ReadonlyRequestCookies) {
    return (
        cookies.get("next-auth.session-token")?.value ||
        cookies.get("__Secure-next-auth.session-token")?.value
    );
}
