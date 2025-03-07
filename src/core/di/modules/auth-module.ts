import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { UsersRepository } from "@/core/modules/auth/infraestructure/repositories/user-repository";
import { AuthService } from "@/core/modules/auth/infraestructure/services/auth-service";

export function createAuthModule() {
    const authModule = createModule();

    if (process.env.NODE_ENV === "test") {
        // TODO: Implement test module
    } else {
        authModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository);
        authModule
            .bind(DI_SYMBOLS.IAuthService)
            .toClass(AuthService, [DI_SYMBOLS.IUsersRepository]);
    }

    return authModule;
}
