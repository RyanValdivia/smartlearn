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
import React from "react";
export default async function Page({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const params = await searchParams;
    const fullTextSearch = params[FULL_TEXT_SEARCH_PARAM_NAME] ?? "";
    const page = parseInt(params[PAGINATION_PARAM_NAME] ?? "1", 10);
    return (
        <MainLayout>
            <MainLayoutTitle>Usuarios</MainLayoutTitle>
            <div>
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
                    <UsersTable page={page} fullTextSearch={fullTextSearch} />
                </React.Suspense>
            </MainLayoutSection>
        </MainLayout>
    );
}
