"use client";

import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavRoutes({
    items,
}: {
    items: {
        name: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
    }[];
}) {
    //TODO Best Label
    return (
        <SidebarGroup>
            <SidebarGroupLabel>App</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                                disabled={!item.isActive}
                                asChild
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
