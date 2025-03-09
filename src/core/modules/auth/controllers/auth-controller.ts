import { type IAuthService } from "../application/services/auth-service";
import { type User } from "../entities/models/user";

interface Credentials {
    username: string;
    password: string;
}

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    async logIn(credentials: Credentials | undefined): Promise<User | null> {
        if (!credentials) {
            return null;
        }

        return this.authService.logIn({
            dni: credentials.username,
            password: credentials.password,
        });
    }

    async userAlreadyExists(email: string | null | undefined) {
        if (!email) {
            return false;
        }

        return this.authService.userAlreadyExists(email);
    }
}
