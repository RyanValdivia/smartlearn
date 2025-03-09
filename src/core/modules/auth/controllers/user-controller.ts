import { type IUsersService } from "../application/services/user-service";
import { type GetAllResponse } from "../entities/models/user";

export class UsersController {
    constructor(private readonly usersService: IUsersService) {}

    async getFilteredUsers(
        query: string | null,
        page: string | null,
    ): Promise<GetAllResponse> {
        return await this.usersService.getFilteredUsers(
            query,
            page ? parseInt(page) : null,
        );
    }
}
