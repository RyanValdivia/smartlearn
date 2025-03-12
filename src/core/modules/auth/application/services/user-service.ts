import { type PaginationResponse } from "@/core/api";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IUsersService } from "../../Domain/user-service";
import {
    type CreateUser,
    type GetManyUsersParams,
    type User,
} from "@/core/api/users/types";

export class UsersService implements IUsersService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<User[]>> {
        return this.usersRepository.getMany(params);
    }

    createUser(input: CreateUser): Promise<User> {
        return this.usersRepository.createUser(input);
    }
}
