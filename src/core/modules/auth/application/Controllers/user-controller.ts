import {
    createUserSchema,
    idSchema,
    updateUserSchema,
    userQueryFilters,
} from "@/core/api/users/schemas";
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

    async getOne(
        _req: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const parse = idSchema.safeParse(await params);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error,
                );
            }

            const id = parse.data.id;

            const user = await this._usersService.getById(id);

            return CommonResponse.successful({
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

    async create(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const json = await req.json();

            const parse = createUserSchema.safeParse(json);

            if (!parse.success) {
                console.log(parse.error);
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        "\n" +
                        parse.error,
                );
            }

            const input = parse.data;

            const user = await this._usersService.createUser(input);

            return CommonResponse.successful({
                message: "Usuario creado correctamente",
                data: user,
            });
        } catch (e: any) {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos " + e.message,
            );
        }
    }

    async update(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const json = await req.json();

            const parse = updateUserSchema.safeParse(json);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        "\n" +
                        parse.error,
                );
            }

            const { id, data } = parse.data;

            const user = await this._usersService.updateUser(id, data);

            return CommonResponse.successful({
                message: "Usuario actualizado correctamente",
                data: user,
            });
        } catch (e: any) {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos " + e.message,
            );
        }
    }

    async delete(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const json = await req.json();

            const parse = idSchema.safeParse(json);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        "\n" +
                        parse.error,
                );
            }

            const id = parse.data.id;

            const user = await this._usersService.deleteUser(id);

            return CommonResponse.successful({
                message: "Usuario eliminado correctamente",
                data: user,
            });
        } catch (e: any) {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos " + e.message,
            );
        }
    }
}
