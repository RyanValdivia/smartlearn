import { type PaginationResponse } from "@/core/api";
import {
    type UserFromAPI,
    type CreateUser,
    type GetManyUsersParams,
} from "@/core/api/users/types";

export interface IUsersService {
    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<UserFromAPI[]>>;

    createUser(input: CreateUser): Promise<UserFromAPI>;
}
