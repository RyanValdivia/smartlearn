import { type AccountFromAPI } from "@/core/api/accounts/account";
import { type IAuthService } from "../../Domain/auth-service";
import { type UserFromAPI } from "@/core/api/users/types";
import { type Account as NextAccount } from "next-auth";

interface Credentials {
    username: string;
    password: string;
}

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    async logIn(
        credentials: Credentials | undefined,
    ): Promise<UserFromAPI | null> {
        if (!credentials) {
            return null;
        }

        return this.authService.logIn({
            dni: credentials.username,
            password: credentials.password,
        });
    }

    async userAlreadyExists(email: string | null | undefined) {
        if (!email) {
            return false;
        }

        return this.authService.userAlreadyExists(email);
    }

    async linkAccount(userId: string, account: AccountFromAPI): Promise<void> {
        return this.authService.linkAccount(userId, account);
    }

    async signIn(userEmail: string | null | undefined, account: NextAccount) {
        return this.authService.signIn(userEmail, {
            access_token: account.access_token || null,
            expires_at: account.expires_at || null,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId || "",
            refresh_token: account.refresh_token || null,
            token_type: account.token_type || null,
            scope: account.scope || null,
            id_token: account.id_token || null,
            session_state: account.session_state || null,
        });
    }
}
