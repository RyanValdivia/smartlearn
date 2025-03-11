import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import type { ReactElement } from "react";

export default async function BreadcrumbSlot({
    params,
}: {
    params: Promise<{ all: string[] }>;
}) {
    const { all } = await params;
    const breadcrumbItems: ReactElement[] = [];
    let breadcrumbPage: ReactElement = <></>;
    for (let i = 1; i < all.length; i++) {
        const route = all[i];
        const href = `/${all.at(0)}/${route}`;
        if (i === all.length - 1) {
            breadcrumbPage = (
                <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                        {route}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            );
        } else {
            breadcrumbItems.push(
                <React.Fragment key={href}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={href} className="capitalize">
                            {route}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </React.Fragment>,
            );
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/app">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbItems}
                {breadcrumbPage}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
