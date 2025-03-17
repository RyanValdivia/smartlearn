import { type PaginationResponse } from "@/core/api";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IUsersService } from "../../Domain/user-service";
import {
    type UserFromAPI,
    type CreateUser,
    type GetManyUsersParams,
} from "@/core/api/users/types";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";

@injectable()
export class UsersService implements IUsersService {
    constructor(
        @inject(DI_SYMBOLS.IUsersRepository)
        private _usersRepository: IUsersRepository,
    ) {}

    getMany({
        params,
    }: {
        params: GetManyUsersParams;
    }): Promise<PaginationResponse<UserFromAPI[]>> {
        return this._usersRepository.getMany(params);
    }

    createUser(input: CreateUser): Promise<UserFromAPI> {
        return this._usersRepository.createUser(input);
    }
}
