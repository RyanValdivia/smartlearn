import { contract } from "@/core/ts-rest";
import { UserRole, usersTable } from "@@/drizzle/schemas/auth";
import { studentsTable } from "@@/drizzle/schemas/student";
import { teachersTable } from "@@/drizzle/schemas/teacher";
import {
    createSelectSchema,
    createInsertSchema,
    createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";
import { type TypedAppRouter } from "../../../utils/types";
import { type GetManyUsersParams, type UserAPI } from "./types";
import { apiResponseSchema } from "../api-response";
import { type ZodInferSchema } from "../types";

export const userSchema = createSelectSchema(usersTable).omit({
    createdAt: true,
    updatedAt: true,
});

export const createUserSchema = createInsertSchema(usersTable)
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
    })
    .extend({
        emailVerified: z
            .string()
            .date()
            .optional()
            .nullable()
            .transform((v) => (v ? new Date(v) : null)),
    });

export const updateUserSchema = createUpdateSchema(usersTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const teacherSchema = createSelectSchema(teachersTable).omit({
    createdAt: true,
    updatedAt: true,
});

export const studentSchema = createSelectSchema(studentsTable).omit({
    createdAt: true,
    updatedAt: true,
});

export const userQueryFilters = z.object<
    ZodInferSchema<GetManyUsersParams["filters"]>
>({
    fullTextSearch: z.string().trim().optional(),
    page: z.coerce.number().int(),
    role: z.nativeEnum(UserRole).optional(),
});

export const userRouter = contract.router({
    getMany: {
        method: "GET",
        path: "/api/admin/users",
        headers: z.object({
            "Content-Type": z.literal("application/json"),
        }),
        query: userQueryFilters,
        summary: "Obtener una lista de Usuarios separado por filtro",
        responses: contract.responses({
            200: apiResponseSchema(userSchema.array()),
        }),
    },
} satisfies TypedAppRouter<UserAPI>);
