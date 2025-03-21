import { type PaginationResponse } from "@/core/api";
import {
    type GetManyUsersParams,
    type UpdateUser,
    type User,
} from "@/core/api/users/types";

export interface IUsersService {
    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<User[]>>;

    getById(id: string): Promise<User>;

    updateUser(id: string, input: UpdateUser): Promise<User>;

    deleteUser(id: string): Promise<User>;
}
