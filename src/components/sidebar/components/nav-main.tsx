"use client";

import { ChevronRight } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { type Route } from "@/core/routes";
import {
    CollapsibleAnimated,
    CollapsibleContentAnimated,
    CollapsibleTriggerAnimated,
} from "@/components/ui/collapsible-animated";
import { Button } from "@/components/ui/button";

export function NavMain({ route, label }: { label: string; route: Route[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {route.map((item) => (
                    <CollapsibleAnimated key={item.name}>
                        <SidebarMenuItem>
                            <div className="grid grid-cols-6">
                                <SidebarMenuButton
                                    className="col-span-5"
                                    asChild
                                >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                                <CollapsibleTriggerAnimated>
                                    <SidebarMenuButton
                                        className="flex justify-center"
                                        tooltip={item.name}
                                        asChild
                                    >
                                        <ChevronRight className="transform-rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTriggerAnimated>
                            </div>
                            <CollapsibleContentAnimated>
                                <SidebarMenuSub>
                                    {item.subRoutes?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.name}>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={subItem.url}>
                                                    <span>{subItem.name}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContentAnimated>
                        </SidebarMenuItem>
                    </CollapsibleAnimated>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
