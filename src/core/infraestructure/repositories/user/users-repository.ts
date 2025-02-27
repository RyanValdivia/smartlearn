import { type IUsersRepository } from "@/core/application/repositories/user/users-repository";
import { type CreateUser, type User } from "@/core/entities/models/user/user";
import { db, usersTable } from "../../../../../drizzle";
import { eq } from "drizzle-orm";

export class UsersRepository implements IUsersRepository {
    async createUser(input: CreateUser): Promise<User> {
        const [user] = await db.insert(usersTable).values(input).returning();
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}