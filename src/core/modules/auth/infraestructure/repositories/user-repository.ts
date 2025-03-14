import { type GetManyUsersParams, type User } from "@/core/api/users/types";
import { type IUsersRepository } from "../../Domain/user-repository";
import { db } from "@@/drizzle/client";
import { count, ilike, or, eq } from "drizzle-orm";
import { usersTable } from "@@/drizzle/schemas/auth";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";
export class UsersRepository implements IUsersRepository {
    async existsUserByEmail(email: string): Promise<boolean> {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        return !!user;
    }
    
    async findUserByDni(dni: string): Promise<User | null> {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.dni, dni))
            .limit(1);
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        return user;
    }
    async getMany(
        params?: GetManyUsersParams,
    ): Promise<PaginationResponse<User[]>> {
        const { filters } = params || {};
        const [users, totalResult] = await Promise.all([
            db
                .select()
                .from(usersTable)
                .where(
                    filters?.fullTextSearch
                        ? or(
                              ilike(
                                  usersTable.name,
                                  `%${filters.fullTextSearch}%`,
                              ),
                              ilike(
                                  usersTable.email,
                                  `%${filters.fullTextSearch}%`,
                              ),
                              ilike(
                                  usersTable.dni,
                                  `%${filters.fullTextSearch}%`,
                              ),
                          )
                        : undefined,
                )
                .limit(MAX_PAGINATION_SIZE)
                .offset(
                    filters?.page
                        ? (filters.page - 1) * MAX_PAGINATION_SIZE
                        : 0,
                ),
            db
                .select({ count: count() })
                .from(usersTable)
                .where(
                    filters?.fullTextSearch
                        ? or(
                              ilike(
                                  usersTable.name,
                                  `%${filters.fullTextSearch}%`,
                              ),
                              ilike(
                                  usersTable.email,
                                  `%${filters.fullTextSearch}%`,
                              ),
                              ilike(
                                  usersTable.dni,
                                  `%${filters.fullTextSearch}%`,
                              ),
                          )
                        : undefined,
                ),
        ]);

        const total = totalResult[0]?.count ?? 0;

        return { data: users, total };
    }
}
