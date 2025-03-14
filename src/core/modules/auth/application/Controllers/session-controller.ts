import { findByTokenSchema } from "@/core/api/sessions/schemas";
import { type NextRequest } from "next/server";
import { type ISessionsService } from "../../Domain/session-service";
import { CommonResponse } from "@/utils/common-response";

export class SessionsController {
    constructor(private readonly sessionsService: ISessionsService) {}

    async findByToken(req: NextRequest): Promise<Response> {
        try {
            const parse = findByTokenSchema.safeParse(await req.json());

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }

            const token = parse.data;

            const session = await this.sessionsService.findByToken(token.token);

            if (!session) {
                return CommonResponse.badRequest("No se encontró la sesión");
            }

            return CommonResponse.successful({
                data: session,
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
