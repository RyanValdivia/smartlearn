import { type PaginationResponse } from "@/core/api";
import {
    type UpdateUser,
    type CreateUser,
    type GetManyUsersParams,
    type UserFromAPI,
} from "@/core/api/users/types";

export interface IUsersRepository {
    getMany(
        params?: GetManyUsersParams,
    ): Promise<PaginationResponse<UserFromAPI[]>>;

    getById(id: string): Promise<UserFromAPI>;

    createUser(input: CreateUser): Promise<UserFromAPI>;

    updateUser(id: string, input: UpdateUser): Promise<UserFromAPI>;

    deleteUser(id: string): Promise<UserFromAPI>;

    existsUserByEmail(email: string): Promise<boolean>;

    findUserByDni(dni: string): Promise<UserFromAPI | null>;

    findUserByEmail(email: string): Promise<UserFromAPI | null>;
}
