import { createUserSchema, userQueryFilters } from "@/core/api/users/schemas";
import { type IUsersService } from "../../Domain/user-service";
import { CommonResponse } from "@/utils/common-response";
import { type NextRequest } from "next/server";
import { isAdminServerAuthSession } from "@/core/server/auth";
import { container } from "@/core/di/Inversify.config";
import { DI_SYMBOLS } from "@/core/di/types";

export class UsersController {
    private _usersService: IUsersService;
    constructor() {
        this._usersService = container.get(DI_SYMBOLS.IUsersService);
    }

    async getMany(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const urlParams: Record<string, string> = Object.fromEntries(
                req.nextUrl.searchParams.entries(),
            );

            const parse = userQueryFilters.safeParse(urlParams);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }
            const queries = parse.data;

            const { data: users, total } = await this._usersService.getMany({
                params: {
                    filters: queries,
                },
            });

            return CommonResponse.successful({
                data: users,
                total,
            });
        } catch {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });con

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos",
            );
        }
    }

    async create(req: NextRequest): Promise<Response> {
        try {
            const parse = createUserSchema.safeParse(await req.json());
            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }

            const user = parse.data;

            await this._usersService.createUser(user);

            return CommonResponse.successful({
                message: "Usuario creado correctamente",
                data: user,
            });
        } catch {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos",
            );
        }
    }
}
