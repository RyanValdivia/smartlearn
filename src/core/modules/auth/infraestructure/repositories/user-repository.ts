import { db } from "@/core/server/db";
import {
    type GetAllResponse,
    type CreateUser,
    type User,
} from "../../entities/models/user";
import { usersTable } from "@@/drizzle/schemas/auth";
import { eq, like, or } from "drizzle-orm";
import { type IUsersRepository } from "../../application/repositories/user-repository";
import { hashPassword } from "../../entities/models/hash";
import { PAGE_SIZE } from "@/core/constants";

export class UsersRepository implements IUsersRepository {
    async createUser(input: CreateUser): Promise<User> {
        if (input.dni && this.isValidDni(input.dni)) {
            throw new Error("Invalid DNI");
        }

        const password = input.password
            ? await hashPassword(input.password)
            : "";

        const [user] = await db
            .insert(usersTable)
            .values({
                ...input,
                password,
            })
            .returning();
        return user;
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

    async existsUserByEmail(email: string): Promise<boolean> {
        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        return !!user;
    }

    async getFilteredUsers(
        query: string | null,
        page: number | null,
    ): Promise<GetAllResponse> {
        const selectQuery = query
            ? or(
                  like(usersTable.name, `%${query}%`),
                  like(usersTable.email, `%${query}%`),
                  like(usersTable.dni, `%${query}%`),
              )
            : undefined;

        const total = await db.$count(usersTable, selectQuery);

        const users = await db.query.usersTable.findMany({
            where: selectQuery,
            limit: PAGE_SIZE,
            offset: page ? (page - 1) * PAGE_SIZE : 0,
            with: {
                accounts: true,
            },
        });

        return {
            total,
            users,
        };
    }

    private isValidDni(dni: string): boolean {
        return /^\d+$/.test(dni) && dni.length === 8;
    }
}
