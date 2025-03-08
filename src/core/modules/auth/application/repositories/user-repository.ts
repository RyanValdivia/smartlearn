import { type CreateUser, type User } from "../../entities/models/user";

export interface IUsersRepository {
    createUser(input: CreateUser): Promise<User>;
    findUserByDni(dni: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    existsUserByEmail(email: string): Promise<boolean>;
}
