import { ROUTES } from "@/core/routes";
import { isAdminServerAuthSession } from "@/core/server/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAdmin = await isAdminServerAuthSession();
    if (!isAdmin) {
        redirect(ROUTES.dashboard.url);
    }

    return <> {children} </>;
}
