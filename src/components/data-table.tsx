"use client";

import {
    flexRender,
    getCoreRowModel,
    type TableOptions,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { logger } from "@/core/logger";
import { useSearchParams, usePathname } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "./ui/pagination";
import { PAGINATION_PARAM_NAME } from "@/core/constants";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<C extends Array<any>, D extends Array<object>>
    extends Omit<
        TableOptions<D[number]>,
        "data" | "columns" | "getCoreRowModel"
    > {
    columns: C;
    data: D;
    renderRowDetails?: (row: D[number]) => React.ReactNode;
    skinny?: true;
    renderAtLast?: React.ReactNode;
    renderRowAtLast?: React.ReactNode;
}

export type TablePaginationProps = {
    totalPages: number;
    currentPage: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<C extends Array<any>, D extends Array<object>>({
    columns,
    data,
    renderAtLast,
    renderRowAtLast,
    pagination,
    ...restProps
}: DataTableProps<C, D> & {
    pagination?: TablePaginationProps;
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        ...restProps,
    });

    return (
        <div className="rounded-md border py-2">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ||
                    renderAtLast ||
                    renderRowAtLast ? (
                        <>
                            {table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </React.Fragment>
                            ))}
                            {!!renderAtLast && (
                                <TableRow>
                                    <TableCell>{renderAtLast}</TableCell>
                                </TableRow>
                            )}
                            {renderRowAtLast}
                        </>
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {pagination && <TablePagination {...pagination} />}
        </div>
    );
}

function TablePagination({ totalPages, currentPage }: TablePaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageLink = (pageNumber: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(PAGINATION_PARAM_NAME, pageNumber.toString());

        return `${pathname}?${newParams.toString()}`;
    };

    return (
        <Pagination>
            <PaginationContent>
                {currentPage !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={createPageLink(currentPage - 1)}
                            replace
                        />
                    </PaginationItem>
                )}
                {totalPages <= 9 &&
                    [...Array(Math.max(totalPages, 0))].map((_, i) => {
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    replace
                                    href={createPageLink(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                {totalPages > 9 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                isActive={currentPage === 1}
                                replace
                                href={createPageLink(1)}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                isActive={currentPage === 2}
                                replace
                                href={createPageLink(2)}
                            >
                                2
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 5 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}
                {totalPages > 9 &&
                    [...Array(5)].map((_, i) => {
                        let initial = Math.max(currentPage - 3, 2);
                        logger.info("initial", initial);
                        if (initial + 8 > (totalPages ?? 0)) {
                            initial = Math.max((totalPages ?? 0) - 7, 2);
                        }
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === initial + i + 1}
                                    replace
                                    href={createPageLink(initial + i + 1)}
                                >
                                    {initial + i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                {totalPages > 9 && (
                    <>
                        {currentPage < (totalPages ?? 0) - 4 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                isActive={currentPage === totalPages - 1}
                                replace
                                href={createPageLink(totalPages - 1)}
                            >
                                {totalPages - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                isActive={currentPage === totalPages}
                                replace
                                href={createPageLink(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {currentPage !== totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href={createPageLink(currentPage + 1)}
                            replace
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
