import { contract } from "@/core/ts-rest";
import { type TypedAppRouter } from "@/utils/types";
import { type UserAPI } from "../users/types";
import { z } from "zod";
import { type ZodInferSchema } from "../types";
import { type TeacherFromAPI, type GetManyTeachersParams } from "./types";
import { apiResponsePaginationSchema } from "../api-response";
import { createdAtSchema, updatedAtSchema } from "@/core/utils";

export const teacherSchema = z.object<ZodInferSchema<TeacherFromAPI>>({
    id: z.string().cuid(),
    userId: z.string().cuid(),
    createdAt: createdAtSchema,
    updatedAt: updatedAtSchema,
});

export const createTeacherSchema = teacherSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const updateTeacherSchema = teacherSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .optional();

export const teacherQueryFilters = z.object<
    ZodInferSchema<GetManyTeachersParams["filters"]>
>({
    fullTextSearch: z.string().trim().optional(),
    page: z.coerce.number().int(),
});

export const teacherRouter = contract.router({
    getMany: {
        method: "GET",
        path: "/api/admin/teachers",
        headers: z.object({
            "Content-Type": z.literal("application/json"),
        }),
        query: teacherQueryFilters,
        summary: "Obtener una lista de Profesores",
        responses: contract.responses({
            200: apiResponsePaginationSchema(teacherSchema.array()),
        }),
    },
} satisfies TypedAppRouter<UserAPI>);
