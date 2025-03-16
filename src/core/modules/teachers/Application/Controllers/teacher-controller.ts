import { type NextRequest } from "next/server";
import { type ITeachersService } from "../../Domain/teacher-service";
import {
    createTeacherSchema,
    teacherQueryFilters,
} from "@/core/api/teachers/schemas";
import { CommonResponse } from "@/utils/common-response";

export class TeachersController {
    constructor(private readonly teachersService: ITeachersService) {}

    async getMany(req: NextRequest): Promise<Response> {
        try {
            const urlParams: Record<string, string> = Object.fromEntries(
                req.nextUrl.searchParams.entries(),
            );

            const parse = teacherQueryFilters.safeParse(urlParams);

            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }

            const queries = parse.data;

            const { data: teachers, total } =
                await this.teachersService.getMany({
                    filters: queries,
                });

            return CommonResponse.successful({
                data: teachers,
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
            const parse = createTeacherSchema.safeParse(await req.json());
            if (!parse.success) {
                throw new Error(
                    "Hubo un error en la validación de los datos " +
                        parse.error.cause,
                );
            }

            const teacher = await this.teachersService.createTeacher(
                parse.data,
            );

            return CommonResponse.successful({
                data: teacher,
                message: "Profesor creado exitosamente",
            });
        } catch {
            //TODO implementar un error handler
            // return ErrorHandler.handle({ error });con

            return CommonResponse.badRequest(
                "Hubo un error en la validación de los datos",
            );
        }
    }
}
