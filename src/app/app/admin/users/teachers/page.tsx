import { TableSkeleton } from "@/components/fallbacks/table-fallback";
import {
    MainLayout,
    MainLayoutTitle,
    MainLayoutSection,
} from "@/components/main-layout";
import { SearchBarContainer, SearchBar } from "@/components/search-bar";
import { UsersTable } from "@/core/api/users/components/table/client";
import {
    FULL_TEXT_SEARCH_PARAM_NAME,
    PAGINATION_PARAM_NAME,
} from "@/core/constants";
import { UserRole } from "@@/drizzle/schemas/auth";
import React from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const params = await searchParams;
    const fullTextSearch = params[FULL_TEXT_SEARCH_PARAM_NAME] ?? "";
    const page = parseInt(params[PAGINATION_PARAM_NAME] ?? "1", 10);

    return (
        <MainLayout>
            <div className="flex items-center justify-between">
                <MainLayoutTitle>Profesores</MainLayoutTitle>
                <SearchBarContainer>
                    <SearchBar
                        inputProps={{
                            defaultValue: fullTextSearch,
                        }}
                    />
                </SearchBarContainer>
            </div>
            <MainLayoutSection>
                <React.Suspense fallback={<TableSkeleton />}>
                    <UsersTable
                        page={page}
                        fullTextSearch={fullTextSearch}
                        role={UserRole.TEACHER}
                    />
                </React.Suspense>
            </MainLayoutSection>
        </MainLayout>
    );
}
