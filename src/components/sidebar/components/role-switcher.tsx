"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { COMPANY_NAME } from "@/core/constants";
import { useAppContext } from "@/core/app-context";
import { SessionRoles } from "@/core/server/auth/types";
import { type UserRole } from "@prisma/client";

export function RoleSwitcher({ roles }: { roles: UserRole[] }) {
    const { selectRole, selectedRole } = useAppContext();

    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <selectedRole.logo className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {selectedRole.access}
                                </span>
                                <span className="truncate text-xs">
                                    {COMPANY_NAME}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Roles
                        </DropdownMenuLabel>
                        {roles.map((role: UserRole) => {
                            const ro = SessionRoles[role];
                            return (
                                <DropdownMenuItem
                                    key={ro.access}
                                    onClick={async () => {
                                        await selectRole(ro.access);
                                    }}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        <ro.logo className="size-4 shrink-0" />
                                    </div>
                                    {ro.access}
                                </DropdownMenuItem>
                            );
                        })}
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
