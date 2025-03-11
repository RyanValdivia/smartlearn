"use client";

import * as React from "react";
import { Frame, Map, UserIcon } from "lucide-react";

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
import { type UserRole } from "@@/drizzle/schemas/auth";
import { NavRoutes } from "./components/nav-routes";
import { ROUTES } from "@/core/routes";
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
const panelAdmin = [
    {
        title: "Usuarios",
        icon: UserIcon,
        items: ROUTES.admin.subRoutes,
    },
];

export function AppSidebar({
    accessibleRoles,
    user,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    accessibleRoles: UserRole[];
    user: AdapterUser;
}) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <RoleSwitcher roles={accessibleRoles} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={panelAdmin} label={"Panel Admin"} />
                <NavRoutes items={data.basicRoutes} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
