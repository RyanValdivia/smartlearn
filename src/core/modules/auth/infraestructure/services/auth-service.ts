import { type IUsersRepository } from "../../application/repositories/user-repository";
import { type IAuthService } from "../../application/services/auth-service";
import { UserNotFoundError } from "../../entities/errors/errors";
import { verifyPassword } from "../../entities/models/hash";
import { type LogIn, type User } from "../../entities/models/user";

export class AuthService implements IAuthService {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async userAlreadyExists(email: string): Promise<boolean> {
        return this.usersRepository.existsUserByEmail(email);
    }

    async logIn(input: LogIn): Promise<User> {
        const user = await this.usersRepository.findUserByDni(input.dni);

        if (!user) {
            throw new UserNotFoundError();
        }

        const match = await verifyPassword(input.password, user.password || "");

        if (!match) {
            throw new UserNotFoundError();
        }

        return user;
    }
}
