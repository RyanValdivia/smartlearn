"use client";
import { useUsers } from "../../queries";
import { DataTable, type TablePaginationProps } from "@/components/data-table";
import { columns } from "./columns";
import { type User } from "../../types";
import React from "react";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";

export function UsersTable({
    page,
    fullTextSearch,
}: {
    page: number;
    fullTextSearch: string;
}) {
    const { data } = useUsers({
        variables: {
            filters: {
                page,
                fullTextSearch,
            },
        },
    });

    const { data: users, total }: PaginationResponse<User[]> =
        React.useMemo(() => {
            if (data) {
                return data.response;
            }
            return {
                data: [],
                total: 0,
            };
        }, [data]);

    return (
        <DataTable
            pagination={
                {
                    totalPages: Math.ceil(total / MAX_PAGINATION_SIZE),
                    currentPage: page,
                } satisfies TablePaginationProps
            }
            state={{
                columnVisibility: {
                    id: false,
                },
            }}
            data={users.map((u) => ({
                id: u.id,
                name: u.name,
                email: u.email ?? "",
                role: u.role,
            }))}
            columns={columns}
        />
    );
}
