import { type IAccountsRepository } from "../modules/auth/Domain/account-repository";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { type IAuthService } from "../modules/auth/Domain/auth-service";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { type AuthController } from "../modules/auth/Application/Controllers/auth-controller";
import { type UsersController } from "../modules/auth/Application/Controllers/user-controller";

export const DI_SYMBOLS = {
    // Repositories
    IUsersRepository: Symbol.for("IUserRepository"),
    IAccountsRepository: Symbol.for("IAccountsRepository"),

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
    IAccountsRepository: IAccountsRepository;

    // Services
    IAuthService: IAuthService;
    IUsersService: IUsersService;

    // Controllers
    AuthController: AuthController;
    UsersController: UsersController;
}
