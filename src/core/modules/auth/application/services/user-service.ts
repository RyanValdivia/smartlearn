import {
    type GetAllResponse,
    type CreateUser,
    type User,
} from "../../entities/models/user";

export interface IUsersService {
    createUser(input: CreateUser): Promise<User>;
    getFilteredUsers(
        query: string | null,
        page: number | null,
    ): Promise<GetAllResponse>;
}
