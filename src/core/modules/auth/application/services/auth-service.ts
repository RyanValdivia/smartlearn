import { type Account } from "../../entities/models/account";
import { type LogIn, type User } from "../../entities/models/user";

export interface IAuthService {
    logIn(input: LogIn): Promise<User>;
    signIn(
        userEmail: string | null | undefined,
        account: Account,
    ): Promise<boolean>;
    userAlreadyExists(email: string): Promise<boolean>;
    linkAccount(userId: string, account: Account): Promise<void>;
}
