import {
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
import { jsonify } from "@/lib/utils";
import { handleError, ValidationError } from "../../Errors/errors";

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
                throw new ValidationError(parse.error.message);
            }

            const queries = parse.data;

            const { data: users, total } = await this._usersService.getMany({
                params: {
                    filters: queries,
                },
            });

            return CommonResponse.successful({
                data: jsonify(users),
                total,
            });
        } catch (error) {
            return handleError(error);
        }
    }

    async getOne(
        _req: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const parse = idSchema.safeParse(await params);

            if (!parse.success) {
                throw new ValidationError(parse.error.message);
            }

            const id = parse.data.id;

            const user = await this._usersService.getById(id);

            return CommonResponse.successful({
                data: jsonify(user),
            });
        } catch (error) {
            return handleError(error);
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
                throw new ValidationError(parse.error.message);
            }

            const { id, data } = parse.data;

            const user = await this._usersService.updateUser(id, data);

            return CommonResponse.successful({
                message: "Usuario actualizado correctamente",
                data: jsonify(user),
            });
        } catch (error) {
            return handleError(error);
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
                throw new ValidationError(parse.error.message);
            }

            const id = parse.data.id;

            const user = await this._usersService.deleteUser(id);

            return CommonResponse.successful({
                message: "Usuario eliminado correctamente",
                data: jsonify(user),
            });
        } catch (error) {
            return handleError(error);
        }
    }
}
