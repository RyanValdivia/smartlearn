import { type IUsersRepository } from "../../application/repositories/user-repository";
import { type IUsersService } from "../../application/services/user-service";
import {
    type GetAllResponse,
    type CreateUser,
    type User,
} from "../../entities/models/user";

export class UsersService implements IUsersService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async createUser(input: CreateUser): Promise<User> {
        return await this.usersRepository.createUser(input);
    }

    async getFilteredUsers(
        query: string | null,
        page: number | null,
    ): Promise<GetAllResponse> {
        return await this.usersRepository.getFilteredUsers(query, page);
    }
}
