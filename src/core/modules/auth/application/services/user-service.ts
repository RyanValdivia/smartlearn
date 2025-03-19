import { type PaginationResponse } from "@/core/api";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IUsersService } from "../../Domain/user-service";
import {
    type UserFromAPI,
    type CreateUser,
    type GetManyUsersParams,
    UpdateUser,
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

    getById(id: string): Promise<UserFromAPI> {
        return this._usersRepository.getById(id);
    }

    createUser(input: CreateUser): Promise<UserFromAPI> {
        return this._usersRepository.createUser(input);
    }

    updateUser(id: string, input: UpdateUser): Promise<UserFromAPI> {
        return this._usersRepository.updateUser(id, input);
    }

    deleteUser(id: string): Promise<UserFromAPI> {
        return this._usersRepository.deleteUser(id);
    }
}
