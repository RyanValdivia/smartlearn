import { CreateUser, User } from "@/src/entities/models/user/user";

export interface IUsersRepository {
    createUser (input: CreateUser) : Promise<User>;
    findUserByEmail (email: string) : Promise<User | null>;
}