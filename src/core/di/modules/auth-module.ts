import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { UsersRepository } from "@/core/modules/auth/Infraestructure/user-repository";
import { AuthService } from "@/core/modules/auth/Application/Services/auth-service";
import { AuthController } from "@/core/modules/auth/Application/Controllers/auth-controller";
import { UsersService } from "@/core/modules/auth/Application/Services/user-service";
import { UsersController } from "@/core/modules/auth/Application/Controllers/user-controller";
import { AccountsRepository } from "@/core/modules/auth/Infraestructure/account-repository";

export function createAuthModule() {
    const authModule = createModule();

    if (process.env.NODE_ENV === "test") {
        // TODO: Implement test module
    } else {
        // Repositories
        authModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository);
        authModule
            .bind(DI_SYMBOLS.IAccountsRepository)
            .toClass(AccountsRepository);

        // Services
        authModule
            .bind(DI_SYMBOLS.IAuthService)
            .toClass(AuthService, [
                DI_SYMBOLS.IUsersRepository,
                DI_SYMBOLS.IAccountsRepository,
            ]);
        authModule
            .bind(DI_SYMBOLS.IUsersService)
            .toClass(UsersService, [DI_SYMBOLS.IUsersRepository]);

        // Controllers
        authModule
            .bind(DI_SYMBOLS.AuthController)
            .toClass(AuthController, [DI_SYMBOLS.IAuthService]);
        authModule
            .bind(DI_SYMBOLS.UsersController)
            .toClass(UsersController, [DI_SYMBOLS.IUsersService]);
    }

    return authModule;
}
