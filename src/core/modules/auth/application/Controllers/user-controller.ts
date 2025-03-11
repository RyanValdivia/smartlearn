import { userQueryFilters } from "@/core/api/users/schemas";
import { type IUsersService } from "../../Domain/user-service";
import { CommonResponse } from "@/utils/common-response";
import { type NextRequest } from "next/server";

export class UsersController {
    constructor(private readonly usersService: IUsersService) {}

    async getMany(req: NextRequest): Promise<Response> {
        try {
            const parse = userQueryFilters.safeParse(
                Object.fromEntries(req.nextUrl.searchParams.entries()),
            );
            if (!parse.success) {
                throw new Error("Hubo un error en la validación de los datos");
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
                "Ocurrio un error y no se cual pq tienes q implementar el handler pq ya me dio flojera, ahora si son mas de 80 archivos tmr xd ",
            );
        }
    }
}
