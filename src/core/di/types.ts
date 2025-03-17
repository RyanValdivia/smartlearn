import { type AuthController } from "../modules/auth/Application/Controllers/auth-controller";
import { type UsersController } from "../modules/auth/Application/Controllers/user-controller";
import { type IAccountsRepository } from "../modules/auth/Domain/account-repository";
import { type IAuthService } from "../modules/auth/Domain/auth-service";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { type TeachersController } from "../modules/teachers/Application/Controllers/teacher-controller";
import { type ITeachersRepository } from "../modules/teachers/Domain/teacher-repository";
import { type ITeachersService } from "../modules/teachers/Domain/teacher-service";

export const DI_SYMBOLS = {
    // Repositories

    IUsersRepository: Symbol.for("IUsersRepository"),
    IAccountsRepository: Symbol.for("IAccountsRepository"),

    // Services

    IAuthService: Symbol.for("IAuthService"),
    IUsersService: Symbol.for("IUsersService"),
    ITeachersService: Symbol.for("ITeachersService"),

    // Controllers

    AuthController: Symbol.for("AuthController"),
    UsersController: Symbol.for("UsersController"),
    TeachersController: Symbol.for("TeachersController"),
};

export interface DI_RETURN_TYPES {
    // Repositories
    IUsersRepository: IUsersRepository;
    IAccountsRepository: IAccountsRepository;
    ITeachersRepository: ITeachersRepository;

    // Services
    IAuthService: IAuthService;
    IUsersService: IUsersService;
    ITeachersService: ITeachersService;

    // Controllers
    AuthController: AuthController;
    UsersController: UsersController;
    TeachersController: TeachersController;
}
