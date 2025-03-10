import { type IAccountsRepository } from "../../application/repositories/account-repository";
import { type IUsersRepository } from "../../application/repositories/user-repository";
import { type IAuthService } from "../../application/services/auth-service";
import { UserNotFoundError } from "../../entities/errors/errors";
import { type Account } from "../../entities/models/account";
import { verifyPassword } from "../../entities/models/hash";
import { type LogIn, type User } from "../../entities/models/user";

export class AuthService implements IAuthService {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly accountsRepository: IAccountsRepository,
    ) {}

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

    async linkAccount(userId: string, account: Account): Promise<void> {
        if (await this.accountsRepository.findAccountByUserId(userId)) {
            throw new Error("Account already exists");
        }

        await this.accountsRepository.createAccount({
            ...account,
            userId,
        });
    }

    async signIn(
        userEmail: string | null | undefined,
        account: Account,
    ): Promise<boolean> {
        const user = await this.usersRepository.findUserByEmail(
            userEmail || "",
        );

        if (!user) {
            return false;
        }

        const userAccount = await this.accountsRepository.findAccountByUserId(
            user.id,
        );

        if (!userAccount) {
            await this.linkAccount(user.id, account);
        }

        return true;
    }
}
