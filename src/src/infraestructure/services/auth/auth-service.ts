import { IAuthService } from "@/src/application/services/auth/auth-service";
import { User } from "@/src/entities/models/user/user";

export class AuthService implements IAuthService {
    signIn(input: User): boolean {
        if (!input.email) {
            return false;
        }
    }
}