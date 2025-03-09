import {
    type GetAllResponse,
    type CreateUser,
    type User,
} from "../../entities/models/user";

export interface IUsersRepository {
    findUserByDni(dni: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    existsUserByEmail(email: string): Promise<boolean>;

    getFilteredUsers(
        query: string | null,
        page: number | null,
    ): Promise<GetAllResponse>;
    createUser(input: CreateUser): Promise<User>;
}
