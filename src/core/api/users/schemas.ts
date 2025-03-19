import { contract } from "@/core/ts-rest";

import { z } from "zod";
import { type TypedAppRouter } from "../../../utils/types";
import {
    type UserFromAPI,
    type GetManyUsersParams,
    type UserAPI,
    type UpdateUser,
} from "./types";
import { apiResponsePaginationSchema } from "../api-response";
import { type ZodInferSchema } from "../types";
import { UserRole } from "@prisma/client";
import { createdAtSchema, updatedAtSchema } from "@/core/utils";

export const idSchema = z.object({
    id: z.string().cuid(),
});

export const userSchema = z.object<ZodInferSchema<UserFromAPI>>({
    id: z.string().cuid(),
    email: z.string().email().nullable(),
    name: z.string(),
    emailVerified: z.string().datetime().nullable(),
    image: z.string().nullable(),
    dni: z.string(),
    password: z.string().nullable(),
    role: z.nativeEnum(UserRole),
    teacherId: z.string().cuid().nullable(),
    studentId: z.string().cuid().nullable(),
    createdAt: createdAtSchema,
    updatedAt: updatedAtSchema,
});

export const updateUserSchema = z.object({
    id: z.string().cuid(),
    data: z.object<ZodInferSchema<UpdateUser>>({
        name: z.string().optional(),
        email: z.string().email().nullable().optional(),
        image: z.string().nullable().optional(),
        dni: z.string().optional(),
        password: z.string().nullable().optional(),
        role: z.nativeEnum(UserRole).optional(),
        id: z.string().cuid(),
    }),
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    emailVerified: true,
    teacherId: true,
    studentId: true,
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
            200: apiResponsePaginationSchema(userSchema.array()),
        }),
    },
} satisfies TypedAppRouter<UserAPI>);
