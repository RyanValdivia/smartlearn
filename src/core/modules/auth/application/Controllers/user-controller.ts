import { createUserSchema, userQueryFilters } from "@/core/api/users/schemas";
import { type IUsersService } from "../../Domain/user-service";
import { CommonResponse } from "@/utils/common-response";
import { type NextRequest } from "next/server";

export class UsersController {
    constructor(private readonly usersService: IUsersService) {}

    async getMany(req: NextRequest): Promise<Response> {
        try {
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
            const { data: users, total } = await this.usersService.getMany({
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

            await this.usersService.createUser(user);

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
