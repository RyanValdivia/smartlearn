import {
    type CreateUser,
    type LogIn,
    type User,
} from "../../entities/models/user";

export interface IAuthService {
    logIn(input: LogIn): Promise<User>;
    register(input: CreateUser): Promise<User>;
    userAlreadyExists(email: string): Promise<boolean>;
}
