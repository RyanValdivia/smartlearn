import { type PaginationResponse } from "@/core/api";
import {
    type UpdateUser,
    type CreateUser,
    type GetManyUsersParams,
    type User,
} from "@/core/api/users/types";

export interface IUsersRepository {
    getMany(params?: GetManyUsersParams): Promise<PaginationResponse<User[]>>;
    createUser(input: CreateUser): Promise<User>;
    updateUser(id: string, input: UpdateUser): Promise<User>;
    deleteUser(id: string): Promise<void>;

    existsUserByEmail(email: string): Promise<boolean>;
    findUserByDni(dni: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}
