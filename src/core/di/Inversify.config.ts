import "reflect-metadata";

import { Container } from "inversify";
import { type IUsersRepository } from "../modules/auth/Domain/user-repository";
import { UsersRepository } from "../modules/auth/Infraestructure/user-repository";
import { type IUsersService } from "../modules/auth/Domain/user-service";
import { UsersService } from "../modules/auth/Application/Services/user-service";
import { DI_SYMBOLS } from "./types";
import { type PrismaClient } from "@prisma/client";
import { db } from "../server/db";
import { type IAuthService } from "../modules/auth/Domain/auth-service";
import { AuthService } from "../modules/auth/Application/Services/auth-service";
import { type IAccountsRepository } from "../modules/auth/Domain/account-repository";
import { AccountsRepository } from "../modules/auth/Infraestructure/account-repository";
import { type ITeachersRepository } from "../modules/teachers/Domain/teacher-repository";
import { TeachersRepository } from "../modules/teachers/Infraestructure/teacher-repository";
import { type ITeachersService } from "../modules/teachers/Domain/teacher-service";
import { type IStudentsRepository } from "../modules/students/Domain/student-repository";
import { StudentsRepository } from "../modules/students/Infraestructure/student-repository";
import { type IStudentsService } from "../modules/students/Domain/student-service";
import { StudentsService } from "../modules/students/Application/Services/student-service";

const container = new Container();
// prisma
container.bind<PrismaClient>(DI_SYMBOLS.PrismaClient).toConstantValue(db);

//ACCOUNTS
container
    .bind<IAccountsRepository>(DI_SYMBOLS.IAccountsRepository)
    .to(AccountsRepository)
    .inSingletonScope();

//auth
container
    .bind<IAuthService>(DI_SYMBOLS.IAuthService)
    .to(AuthService)
    .inSingletonScope();

//users
container
    .bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
container
    .bind<IUsersService>(DI_SYMBOLS.IUsersService)
    .to(UsersService)
    .inSingletonScope();

//teacher
container
    .bind<ITeachersRepository>(DI_SYMBOLS.ITeachersRepository)
    .to(TeachersRepository)
    .inSingletonScope();
container
    .bind<ITeachersService>(DI_SYMBOLS.ITeachersService)
    .to(TeachersRepository)
    .inSingletonScope();

//student

container
    .bind<IStudentsRepository>(DI_SYMBOLS.IStudentsRepository)
    .to(StudentsRepository)
    .inSingletonScope();

container
    .bind<IStudentsService>(DI_SYMBOLS.IStudentsService)
    .to(StudentsService)
    .inSingletonScope();

export { container };
