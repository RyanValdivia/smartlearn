import { type Account } from "../../../api/accounts/account";
import { type LogIn } from "@/core/api/users/types";
import { type User } from "@/core/api/users/types";

export interface IAuthService {
    logIn(input: LogIn): Promise<User>;
    signIn(
        userEmail: string | null | undefined,
        account: Account,
    ): Promise<boolean>;
    userAlreadyExists(email: string): Promise<boolean>;
    linkAccount(userId: string, account: Account): Promise<void>;
}
