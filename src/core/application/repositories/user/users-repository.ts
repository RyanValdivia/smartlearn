import { type CreateUser, type User } from "@/core/entities/models/user/schemas/user";

export interface IUsersRepository {
    createUser (input: CreateUser): Promise<User>
    findUserByEmail (email: string): Promise<User | null>
}
