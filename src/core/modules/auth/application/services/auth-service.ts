import { type LogIn, type User } from "../../entities/models/user";

export interface IAuthService {
    logIn(input: LogIn): Promise<User>;
    userAlreadyExists(email: string): Promise<boolean>;
}
