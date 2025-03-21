import { type NextRequest } from "next/server";
import { type ITeachersService } from "../../Domain/teacher-service";
import {
    createTeacherSchema,
    // teacherQueryFilters,
} from "@/core/api/teachers/schemas";
import { CommonResponse } from "@/utils/common-response";
import { container } from "@/core/di/Inversify.config";
import { DI_SYMBOLS } from "@/core/di/types";
import { idSchema } from "@/core/api/users/schemas";
import { isAdminServerAuthSession } from "@/core/server/auth";
import { jsonify } from "@/lib/utils";
import { handleError, ValidationError } from "../../Errors/errors";

export class TeachersController {
    private _teachersService: ITeachersService;
    constructor() {
        this._teachersService = container.get(DI_SYMBOLS.ITeachersService);
    }

    async create(req: NextRequest): Promise<Response> {
        try {
            const isAdmin = await isAdminServerAuthSession();

            if (!isAdmin) {
                return CommonResponse.unauthorized();
            }

            const json = await req.json();

            const parse = createTeacherSchema.safeParse(json);

            if (!parse.success) {
                throw new ValidationError(parse.error.message);
            }

            const teacher = await this._teachersService.createTeacher(
                parse.data,
            );

            return CommonResponse.successful({
                data: jsonify(teacher),
                message: "Profesor creado exitosamente",
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

            const teacher = await this._teachersService.deleteTeacher(
                parse.data.id,
            );

            return CommonResponse.successful({
                data: jsonify(teacher),
                message: "Profesor eliminado exitosamente",
            });
        } catch (error) {
            return handleError(error);
        }
    }
}
