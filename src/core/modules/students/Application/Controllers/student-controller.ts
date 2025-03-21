import { container } from "@/core/di/Inversify.config";
import { DI_SYMBOLS } from "@/core/di/types";
import { type IStudentsService } from "../../Domain/student-service";
import { type NextRequest } from "next/server";
import { isAdminServerAuthSession } from "@/core/server/auth";
import { CommonResponse } from "@/utils/common-response";
import { createStudentSchema } from "@/core/api/students/schemas";
import { idSchema } from "@/core/api/users/schemas";
import { jsonify } from "@/lib/utils";
import { handleError, ValidationError } from "../../Errors/errors";

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
                throw new ValidationError(parse.error.message);
            }

            const student = await this._studentsService.createStudent(
                parse.data,
            );

            return CommonResponse.successful({
                data: jsonify(student),
                message: "Estudiante creado exitosamente",
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

            const student = await this._studentsService.deleteStudent(
                parse.data.id,
            );

            return CommonResponse.successful({
                data: jsonify(student),
                message: "Estudiante eliminado exitosamente",
            });
        } catch (error) {
            return handleError(error);
        }
    }
}
