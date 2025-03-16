import { type PaginationResponse } from "@/core/api";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IUsersService } from "../../Domain/user-service";
import {
    type UserFromAPI,
    type CreateUser,
    type GetManyUsersParams,
} from "@/core/api/users/types";

export class UsersService implements IUsersService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<UserFromAPI[]>> {
        return this.usersRepository.getMany(params);
    }

    createUser(input: CreateUser): Promise<UserFromAPI> {
        return this.usersRepository.createUser(input);
    }
}
