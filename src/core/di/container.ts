import "reflect-metadata";

import { Container } from "inversify";
import { type DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { UsersRepository } from "../modules/auth/Infraestructure/user-repository";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { UsersService } from "../modules/auth/Application/Services/user-service";
import { UsersController } from "../modules/auth/Application/Controllers/user-controller";

const container = new Container();

container
    .bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository)
    .to(UsersRepository)
    .inSingletonScope();

container
    .bind<IUsersService>(DI_SYMBOLS.IUsersService)
    .to(UsersService)
    .inSingletonScope();

container
    .bind<UsersController>(DI_SYMBOLS.UsersController)
    .to(UsersController)
    .inSingletonScope();

export { container };

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K,
): DI_RETURN_TYPES[K] {
    return container.get(DI_SYMBOLS[symbol]);
}
