import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { AuthService } from "@/core/infraestructure/services/auth/auth-service";
import { UsersRepository } from "@/core/infraestructure/repositories/user/users-repository";

export function createAuthModule() {
    const authModule = createModule();

    if (process.env.NODE_ENV === "test") {
        // TODO: Implement test module
    } else {
        authModule
            .bind(DI_SYMBOLS.IUsersRepository)
            .toClass(UsersRepository);
        authModule
            .bind(DI_SYMBOLS.IAuthService)
            .toClass(AuthService, [DI_SYMBOLS.IUsersRepository]);
    }

    return authModule;
}