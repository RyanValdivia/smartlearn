"use client";
import { useUsers } from "../../queries";
import { DataTable, type TablePaginationProps } from "@/components/data-table";
import { columns, type UserTableItem } from "./columns";
import { type UserFromAPI } from "../../types";
import React from "react";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";
import { type UserRole } from "@prisma/client";

export function UsersTable({
    page,
    fullTextSearch,
    role,
}: {
    page: number;
    fullTextSearch: string;
    role?: UserRole;
}) {
    const { data } = useUsers({
        variables: {
            filters: {
                page,
                fullTextSearch,
                role,
            },
        },
    });

    const { data: users, total }: PaginationResponse<UserFromAPI[]> =
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
            data={users.map(
                (u) =>
                    ({
                        id: u.id,
                        name: u.name,
                        email: u.email ?? "",
                        role: u.role,
                        dni: parseInt(u.dni, 10),
                        imagen: u.image,
                    }) satisfies UserTableItem,
            )}
            columns={columns}
        />
    );
}
