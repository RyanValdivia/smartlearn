import { type PaginationResponse } from "@/core/api";
import {
    type CreateUser,
    type GetManyUsersParams,
    type UpdateUser,
    User,
} from "@/core/api/users/types";

export interface IUsersService {
    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<User[]>>;

    getById(id: string): Promise<User>;

    createUser(input: CreateUser): Promise<User>;

    updateUser(id: string, input: UpdateUser): Promise<User>;

    deleteUser(id: string): Promise<User>;
}
