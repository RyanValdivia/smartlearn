import { type RegisterAccount } from "@/core/api/accounts/types";
import {
    type LogIn,
    type User,
    type RegisterUser,
} from "@/core/api/users/types";
export interface IAuthService {
    logInCredentials(input: LogIn): Promise<User>;

    logInGoogle(user: RegisterUser, account: RegisterAccount): Promise<boolean>;
}
