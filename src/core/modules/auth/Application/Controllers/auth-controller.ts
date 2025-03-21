import { type UserFromAPI } from "@/core/api/users/types";
import { type Account as NextAccount } from "next-auth";
import { container } from "@/core/di/Inversify.config";
import { type IAuthService } from "../../Domain/auth-service";
import { DI_SYMBOLS } from "@/core/di/types";
import { jsonify } from "@/lib/utils";

interface Credentials {
    dni: string;
    password: string;
}

interface Profile {
    email: string;
    image: string;
    name: string;
}

export class AuthController {
    private _authService: IAuthService;
    constructor() {
        this._authService = container.get(DI_SYMBOLS.IAuthService);
    }

    async loginGoogle(user: Profile, account: NextAccount): Promise<boolean> {
        return this._authService.logInGoogle(
            {
                email: user.email || "",
                image: user.image || "",
                name: user.name || "",
            },
            {
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
            },
        );
    }

    async loginCredentials(
        credentials: Credentials | undefined,
    ): Promise<UserFromAPI | null> {
        if (!credentials) {
            return null;
        }

        const user = await this._authService.logInCredentials({
            dni: credentials.dni,
            password: credentials.password,
        });

        return jsonify(user);
    }
}
