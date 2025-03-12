import { contract } from "@/core/ts-rest";
import { usersTable } from "@@/drizzle/schemas/auth";
import { studentsTable } from "@@/drizzle/schemas/student";
import { teachersTable } from "@@/drizzle/schemas/teacher";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { type TypedAppRouter } from "../../../utils/types";
import { type GetManyUsersParams, type UserAPI } from "./types";
import { apiResponseSchema } from "../api-response";
import { type ZodInferSchema } from "../types";

export const userSchema = createSelectSchema(usersTable).omit({
    createdAt: true,
    updatedAt: true,
});

export const createUserSchema = createInsertSchema(usersTable).omit({
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
export const logInSchema = z.object({
    dni: z.string().length(8, { message: "El DNI debe tener 8 caracteres" }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(20, {
            message: "La contraseña debe tener como máximo 20 caracteres",
        })
        .refine((password) => /[A-Z]/.test(password), {
            message: "La contraseña debe tener al menos una mayúscula",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "La contraseña debe tener al menos una minúscula",
        })
        .refine((password) => /[0-9]/.test(password), {
            message: "La contraseña debe tener al menos un número",
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "La contraseña debe tener al menos un caracter especial",
        }),
});

export const userQueryFilters = z.object<
    ZodInferSchema<GetManyUsersParams["filters"]>
>({
    fullTextSearch: z.string().trim().optional(),
    page: z.coerce.number().int(),
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
