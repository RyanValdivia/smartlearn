import { type IAccountsRepository } from "../modules/auth/Domain/account-repository";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { type IAuthService } from "../modules/auth/Domain/auth-service";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { type AuthController } from "../modules/auth/Application/Controllers/auth-controller";
import { type UsersController } from "../modules/auth/Application/Controllers/user-controller";

import { type ITeachersRepository } from "../modules/teachers/Domain/teacher-repository";
import { type ITeachersService } from "../modules/teachers/Domain/teacher-service";
import { type TeachersController } from "../modules/teachers/Application/Controllers/teacher-controller";

export const DI_SYMBOLS = {
    // Repositories
    IUsersRepository: Symbol.for("IUserRepository"),
    IAccountsRepository: Symbol.for("IAccountsRepository"),
    // ISessionsRepository: Symbol.for("ISessionsRepository"),
    ITeachersRepository: Symbol.for("ITeachersRepository"),

    // Services
    IAuthService: Symbol.for("IAuthService"),
    IUsersService: Symbol.for("IUsersService"),
    // ISessionsService: Symbol.for("ISessionsService"),
    ITeachersService: Symbol.for("ITeachersService"),

    // Controllers
    AuthController: Symbol.for("AuthController"),
    UsersController: Symbol.for("UsersController"),
    // SessionsController: Symbol.for("SessionsController"),
    TeachersController: Symbol.for("TeachersController"),
};

export default interface DI_RETURN_TYPES {
    // Repositories
    IUsersRepository: IUsersRepository;
    IAccountsRepository: IAccountsRepository;
    // ISessionsRepository: ISessionsRepository;
    ITeachersRepository: ITeachersRepository;

    // Services
    IAuthService: IAuthService;
    IUsersService: IUsersService;
    // ISessionsService: ISessionsService;
    ITeachersService: ITeachersService;

    // Controllers
    AuthController: AuthController;
    UsersController: UsersController;
    // SessionsController: SessionsController;
    TeachersController: TeachersController;
}
