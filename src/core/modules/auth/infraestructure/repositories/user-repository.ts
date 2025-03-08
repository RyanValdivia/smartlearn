import { db } from "@@/drizzle/client";
import { type CreateUser, type User } from "../../entities/models/user";
import { usersTable } from "@@/drizzle/schemas/auth";
import { eq } from "drizzle-orm";
import { type IUsersRepository } from "../../application/repositories/user-repository";
import { hashPassword } from "../../entities/models/hash";

export class UsersRepository implements IUsersRepository {
    async createUser(input: CreateUser): Promise<User> {
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
}
