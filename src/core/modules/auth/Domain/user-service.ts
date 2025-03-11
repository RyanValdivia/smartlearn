import { type PaginationResponse } from "@/core/api";
import { type GetManyUsersParams, type User } from "@/core/api/users/types";

export interface IUsersService {
    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<User[]>>;
}
