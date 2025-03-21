import { type IAccountsRepository } from "../../Domain/account-repository";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IAuthService } from "../../Domain/auth-service";
import { UserNotFoundError } from "../../Errors/errors";
import { verifyPassword } from "../../../../api/hash";
import { type UserFromAPI, type LogIn } from "@/core/api/users/types";
import { type AccountFromAPI } from "@/core/api/accounts/account";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(DI_SYMBOLS.IUsersRepository)
        private _usersRepository: IUsersRepository,
        @inject(DI_SYMBOLS.IAccountsRepository)
        private _accountsRepository: IAccountsRepository,
    ) {}

    async userAlreadyExists(email: string): Promise<boolean> {
        return this._usersRepository.existsUserByEmail(email);
    }

    async logIn(input: LogIn): Promise<UserFromAPI> {
        const user = await this._usersRepository.findUserByDni(input.dni);
        
        if (!user) {
            throw new UserNotFoundError();
        }

        const match = await verifyPassword(input.password, user.password || "");

        if (!match) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async linkAccount(userId: string, account: AccountFromAPI): Promise<void> {
        if (await this._accountsRepository.findAccountByUserId(userId)) {
            throw new Error("Account already exists");
        }

        await this._accountsRepository.createAccount({
            ...account,
            userId,
        });
    }

    async signIn(
        userEmail: string | null | undefined,
        account: AccountFromAPI,
    ): Promise<boolean> {
        const user = await this._usersRepository.findUserByEmail(
            userEmail || "",
        );

        if (!user) {
            return false;
        }

        const userAccount = await this._accountsRepository.findAccountByUserId(
            user.id,
        );

        if (!userAccount) {
            await this.linkAccount(user.id, account);
        }

        return true;
    }
}
