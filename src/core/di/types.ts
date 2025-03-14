import { type IAccountsRepository } from "../modules/auth/Domain/account-repository";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { type IAuthService } from "../modules/auth/Domain/auth-service";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { type AuthController } from "../modules/auth/Application/Controllers/auth-controller";
import { type UsersController } from "../modules/auth/Application/Controllers/user-controller";
import { type ISessionsRepository } from "../modules/auth/Domain/session-repository";
import { type ISessionsService } from "../modules/auth/Domain/session-service";
import { type SessionsController } from "../modules/auth/Application/Controllers/session-controller";

export const DI_SYMBOLS = {
    // Repositories
    IUsersRepository: Symbol.for("IUserRepository"),
    IAccountsRepository: Symbol.for("IAccountsRepository"),
    ISessionsRepository: Symbol.for("ISessionsRepository"),

    // Services
    IAuthService: Symbol.for("IAuthService"),
    IUsersService: Symbol.for("IUsersService"),
    ISessionsService: Symbol.for("ISessionsService"),

    // Controllers
    AuthController: Symbol.for("AuthController"),
    UsersController: Symbol.for("UsersController"),
    SessionsController: Symbol.for("SessionsController"),
};

export interface DI_RETURN_TYPES {
    // Repositories
    IUsersRepository: IUsersRepository;
    IAccountsRepository: IAccountsRepository;
    ISessionsRepository: ISessionsRepository;

    // Services
    IAuthService: IAuthService;
    IUsersService: IUsersService;
    ISessionsService: ISessionsService;

    // Controllers
    AuthController: AuthController;
    UsersController: UsersController;
    SessionsController: SessionsController;
}
