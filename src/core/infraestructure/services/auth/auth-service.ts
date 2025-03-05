import { type IUsersRepository } from "@/core/application/repositories/user/users-repository";
import { type IAuthService } from "@/core/application/services/auth/auth-service";
import {
    type CreateUser,
    type User,
} from "@/core/components/user/schemas/user";

export class AuthService implements IAuthService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async signIn(input: CreateUser): Promise<User> {
        let user = await this.usersRepository.findUserByEmail(
            input.email || "",
        );

        if (!user) {
            user = await this.usersRepository.createUser(input);
        }

        return user;
    }
}
