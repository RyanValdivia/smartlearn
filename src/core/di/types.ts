import { type IUsersRepository } from "../modules/auth/application/repositories/user-repository";
import { type IAuthService } from "../modules/auth/application/services/auth-service";

export const DI_SYMBOLS = {
    // Repositories
    IUsersRepository: Symbol.for("IUserRepository"),

    // Services
    IAuthService: Symbol.for("IAuthService"),
};

export interface DI_RETURN_TYPES {
    IUsersRepository: IUsersRepository;
    IAuthService: IAuthService;
}
