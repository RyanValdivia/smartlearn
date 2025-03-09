import { type IUsersRepository } from "../modules/auth/application/repositories/user-repository";
import { type IAuthService } from "../modules/auth/application/services/auth-service";
import { type IUsersService } from "../modules/auth/application/services/user-service";
import { type AuthController } from "../modules/auth/controllers/auth-controller";
import { type UsersController } from "../modules/auth/controllers/user-controller";

export const DI_SYMBOLS = {
    // Repositories
    IUsersRepository: Symbol.for("IUserRepository"),

    // Services
    IAuthService: Symbol.for("IAuthService"),
    IUsersService: Symbol.for("IUsersService"),

    // Controllers
    AuthController: Symbol.for("AuthController"),
    UsersController: Symbol.for("UsersController"),
};

export interface DI_RETURN_TYPES {
    // Repositories
    IUsersRepository: IUsersRepository;

    // Services
    IAuthService: IAuthService;
    IUsersService: IUsersService;

    // Controllers
    AuthController: AuthController;
    UsersController: UsersController;
}
