import { type IAccountsRepository } from "../../Domain/account-repository";
import { type IUsersRepository } from "../../Domain/user-repository";
import { type IAuthService } from "../../Domain/auth-service";
import { UserNotFoundError } from "../../Errors/errors";
import { verifyPassword } from "../../../../api/hash";
import {
    type LogIn,
    type User,
    type RegisterUser,
} from "@/core/api/users/types";
import { type CreateAccount } from "@/core/api/accounts/types";
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

    async logInCredentials(input: LogIn): Promise<User> {
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

    async logInGoogle(
        user: RegisterUser,
        account: CreateAccount,
    ): Promise<boolean> {
        console.log("amogus");
        const foundUser = await this._usersRepository.findUserByEmail(
            user.email || "",
        );

        if (!foundUser) {
            return false;
        }

        const userAccount = await this._accountsRepository.findAccountByUserId(
            foundUser.id,
        );

        if (!userAccount) {
            await this._accountsRepository.createAccount({
                ...account,
                userId: foundUser.id,
            });
        }

        await this._usersRepository.updateUser(foundUser.id, {
            email: user.email,
            image: user.image,
            name: user.name,
        });

        return true;
    }
}
