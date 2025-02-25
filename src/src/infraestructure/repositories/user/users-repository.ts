import { IUsersRepository } from "@/src/application/repositories/user/users-repository";
import { CreateUser, User } from "@/src/entities/models/user/user";
import { db, users } from "@/drizzle";
import { eq } from "drizzle-orm";

export class UsersRepository implements IUsersRepository {
    async createUser(input: CreateUser): Promise<User> {
        try {
            const [user] = await db.insert(users).values(input).returning();
            return user;

        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
            return user;
        } catch (error) {
            throw error;
        }
    }
}