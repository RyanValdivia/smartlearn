import { type PaginationResponse } from "@/core/api";
import {
    type UserFromAPI,
    type CreateUser,
    type GetManyUsersParams,
    type UpdateUser,
} from "@/core/api/users/types";

export interface IUsersService {
    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<UserFromAPI[]>>;

    getById(id: string): Promise<UserFromAPI>;

    createUser(input: CreateUser): Promise<UserFromAPI>;

    updateUser(id: string, input: UpdateUser): Promise<UserFromAPI>;

    deleteUser(id: string): Promise<UserFromAPI>;
}
