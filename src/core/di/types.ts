import { type IUsersRepository } from "@/core/application/repositories/user/users-repository";
import { type IAuthService } from "@/core/application/services/auth/auth-service";

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
