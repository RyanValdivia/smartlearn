import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Footer from "@/components/footer";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import NextTopLoader from "nextjs-toploader";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/core/server/auth";
export default async function DashboardLayout({
    breadcrumb,
    children,
}: Readonly<{
    breadcrumb: React.ReactNode;
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
    const { user, own } = await getSession();
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar user={user} accessibleRoles={own.accesibleRoles} />
            <NextTopLoader />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        {breadcrumb}
                    </div>
                </header>
                <main className="px-8">{children}</main>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
