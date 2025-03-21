import { container } from "@/core/di/Inversify.config";
import { DI_SYMBOLS } from "@/core/di/types";
import { type IStudentsService } from "../../Domain/student-service";
import { type NextRequest } from "next/server";
import { isAdminServerAuthSession } from "@/core/server/auth";
import { CommonResponse } from "@/utils/common-response";
import { createStudentSchema } from "@/core/api/students/schemas";
import { idSchema } from "@/core/api/users/schemas";
import { jsonify } from "@/lib/utils";

export class StudentsController {
    private _studentsService: IStudentsService;
    constructor() {
        this._studentsService = container.get(DI_SYMBOLS.IStudentsService);
    }

    async create(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const json = await req.json();

            const parse = createStudentSchema.safeParse(json);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }

            const student = await this._studentsService.createStudent(
                parse.data,
            );

            return CommonResponse.successful({
                data: jsonify(student),
                message: "Estudiante creado exitosamente",
            });
        } catch {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos",
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
                        parse.error.cause,
                );
            }

            const student = await this._studentsService.deleteStudent(
                parse.data.id,
            );

            return CommonResponse.successful({
                data: jsonify(student),
                message: "Estudiante eliminado exitosamente",
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
