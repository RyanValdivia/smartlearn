import { createContainer } from "@evyweb/ioctopus";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { createAuthModule } from "./modules/auth-module";

const container = createContainer();

container.load(Symbol.for("AuthModule"), createAuthModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
) : DI_RETURN_TYPES[K]{
    return container.get(DI_SYMBOLS[symbol]);
}