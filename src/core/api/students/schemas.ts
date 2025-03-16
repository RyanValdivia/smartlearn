import { studentsTable } from "@@/drizzle/schemas/student";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";
import { type ZodInferSchema } from "../types";
import { z } from "zod";
import { type StudentAPI, type GetManyStudentsParams } from "./types";
import { contract } from "@/core/ts-rest";
import { type TypedAppRouter } from "@/utils/types";
import { apiResponsePaginationSchema } from "../api-response";

export const studentSchema = createSelectSchema(studentsTable);

export const createStudentSchema = createInsertSchema(studentsTable);

export const updateStudentSchema = createUpdateSchema(studentsTable);

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
