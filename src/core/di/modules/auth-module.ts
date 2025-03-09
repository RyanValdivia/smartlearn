import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { UsersRepository } from "@/core/modules/auth/infraestructure/repositories/user-repository";
import { AuthService } from "@/core/modules/auth/infraestructure/services/auth-service";
import { AuthController } from "@/core/modules/auth/controllers/auth-controller";
import { UsersService } from "@/core/modules/auth/infraestructure/services/user-service";
import { UsersController } from "@/core/modules/auth/controllers/user-controller";

export function createAuthModule() {
    const authModule = createModule();

    if (process.env.NODE_ENV === "test") {
        // TODO: Implement test module
    } else {
        authModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository);

        authModule
            .bind(DI_SYMBOLS.IAuthService)
            .toClass(AuthService, [DI_SYMBOLS.IUsersRepository]);
        authModule
            .bind(DI_SYMBOLS.IUsersService)
            .toClass(UsersService, [DI_SYMBOLS.IUsersRepository]);

        authModule
            .bind(DI_SYMBOLS.AuthController)
            .toClass(AuthController, [DI_SYMBOLS.IAuthService]);
        authModule
            .bind(DI_SYMBOLS.UsersController)
            .toClass(UsersController, [DI_SYMBOLS.IUsersService]);
    }

    return authModule;
}
