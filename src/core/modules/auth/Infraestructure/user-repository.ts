import {
    type UpdateUser,
    type UserQueryFilters,
    type CreateUser,
    type GetManyUsersParams,
    type User,
} from "@/core/api/users/types";
import { type IUsersRepository } from "../Domain/user-repository";
import { db } from "@@/drizzle/client";
import { count, ilike, or, eq, and } from "drizzle-orm";
import { usersTable } from "@@/drizzle/schemas/auth";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";
import { type PaginationParams } from "@/utils/types";
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
                .where(filters ? this._createWhere(filters) : undefined)
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

    async createUser(input: CreateUser): Promise<User> {
        const [user] = await db.insert(usersTable).values(input).returning();
        return user;
    }

    async updateUser(id: string, input: UpdateUser): Promise<User> {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id));

        if (!user) {
            throw new Error("User not found");
        }

        const [newUser] = await db
            .update(usersTable)
            .set(input)
            .where(eq(usersTable.id, id))
            .returning();

        return newUser;
    }

    async deleteUser(id: string): Promise<void> {
        await db.delete(usersTable).where(eq(usersTable.id, id));
    }

    private _createWhere(filters: PaginationParams<UserQueryFilters>) {
        if (filters.fullTextSearch && filters.role) {
            return and(
                eq(usersTable.role, filters.role),
                or(
                    ilike(usersTable.name, `%${filters.fullTextSearch}%`),
                    ilike(usersTable.email, `%${filters.fullTextSearch}%`),
                    ilike(usersTable.dni, `%${filters.fullTextSearch}%`),
                ),
            );
        }

        if (filters.fullTextSearch) {
            return or(
                ilike(usersTable.name, `%${filters.fullTextSearch}%`),
                ilike(usersTable.email, `%${filters.fullTextSearch}%`),
                ilike(usersTable.dni, `%${filters.fullTextSearch}%`),
            );
        }

        if (filters.role) {
            return eq(usersTable.role, filters.role);
        }
    }
}
