import { createContainer } from "@evyweb/ioctopus";
import type DI_RETURN_TYPES from "./types";
import { DI_SYMBOLS } from "./types";
import { createAuthModule } from "./modules/auth-module";
import { createTeacherModule } from "./modules/teacher-module";

const container = createContainer();

container.load(Symbol.for("AuthModule"), createAuthModule());
container.load(Symbol.for("TeacherModule"), createTeacherModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K,
): DI_RETURN_TYPES[K] {
    return container.get(DI_SYMBOLS[symbol]);
}
