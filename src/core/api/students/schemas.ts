import { type ZodInferSchema } from "../types";
import { z } from "zod";
import {
    type StudentAPI,
    type GetManyStudentsParams,
    type StudentFromAPI,
} from "./types";
import { contract } from "@/core/ts-rest";
import { type TypedAppRouter } from "@/utils/types";
import { apiResponsePaginationSchema } from "../api-response";
import { createdAtSchema, updatedAtSchema } from "@/core/utils";

export const studentSchema = z.object<ZodInferSchema<StudentFromAPI>>({
    id: z.string().cuid(),
    userId: z.string().cuid(),
    sectionId: z.number().int().nullable(),
    createdAt: createdAtSchema,
    updatedAt: updatedAtSchema,
});

export const createStudentSchema = z.object({
    name: z.string(),
    dni: z.string(),
    password: z.string(),
});

export const studentQueryFilters = z.object<
    ZodInferSchema<GetManyStudentsParams["filters"]>
>({
    fullTextSearch: z.string().trim().optional(),
    page: z.coerce.number().int(),
});

export const studentRouter = contract.router({
    getMany: {
        method: "GET",
        path: "/api/admin/students",
        headers: z.object({
            "Content-Type": z.literal("application/json"),
        }),
        query: studentQueryFilters,
        summary: "Obtener una lista de Estudiantes",
        responses: contract.responses({
            200: apiResponsePaginationSchema(studentSchema.array()),
        }),
    },
} satisfies TypedAppRouter<StudentAPI>);
