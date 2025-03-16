import { type AccountFromAPI } from "@/core/api/accounts/account";
import { type UserFromAPI, type LogIn } from "@/core/api/users/types";

export interface IAuthService {
    logIn(input: LogIn): Promise<UserFromAPI>;
    signIn(
        userEmail: string | null | undefined,
        account: AccountFromAPI,
    ): Promise<boolean>;
    userAlreadyExists(email: string): Promise<boolean>;
    linkAccount(userId: string, account: AccountFromAPI): Promise<void>;
}
