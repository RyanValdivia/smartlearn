import { contract } from "@/core/ts-rest";
import { type TypedAppRouter } from "@/utils/types";
import { teachersTable } from "@@/drizzle/schemas/teacher";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type UserAPI } from "../users/types";
import { z } from "zod";
import { type ZodInferSchema } from "../types";
import { type GetManyTeachersParams } from "./types";
import { apiResponsePaginationSchema } from "../api-response";
import { userSchema } from "../users/schemas";

export const teacherSchema = createSelectSchema(teachersTable)
    .omit({
        createdAt: true,
        updatedAt: true,
    })
    .extend({
        user: userSchema,
    });

export const createTeacherSchema = createInsertSchema(teachersTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const updateTeacherSchema = createInsertSchema(teachersTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

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
