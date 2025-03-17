"use client";

import * as React from "react";
import { Frame, Map } from "lucide-react";

import { NavMain } from "@/components/sidebar/components/nav-main";
import { NavUser } from "@/components/sidebar/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { RoleSwitcher } from "./components/role-switcher";
import { type AdapterUser } from "next-auth/adapters";
import { NavRoutes } from "./components/nav-routes";
import { type Route, ROUTES } from "@/core/routes";
import { UserRole } from "@prisma/client";
const data = {
    basicRoutes: [
        ROUTES.dashboard,
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
            isActive: true,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
            isActive: false,
        },
    ],
};
const panelAdmin: Route[] = ROUTES.admin.subRoutes;

export function AppSidebar({
    accessibleRoles,
    user,
    sessionRole,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    accessibleRoles: UserRole[];
    user: AdapterUser;
    sessionRole: UserRole;
}) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <RoleSwitcher roles={accessibleRoles} />
            </SidebarHeader>
            <SidebarContent>
                {sessionRole === UserRole.ADMIN && (
                    <NavMain route={panelAdmin} label={"Panel Admin"} />
                )}
                <NavRoutes items={data.basicRoutes} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
