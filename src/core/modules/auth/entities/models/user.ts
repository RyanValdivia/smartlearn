import { usersTable } from "@@/drizzle/schemas/auth";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userSchema = createSelectSchema(usersTable).omit({
    createdAt: true,
    updatedAt: true,
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = createInsertSchema(usersTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const logInSchema = z.object({
    dni: z
        .string()
        .min(2, {
            message: "El identificador debe tener al menos 2 caracteres",
        })
        .max(50, {
            message: "El identificador debe tener menos de 50 caracteres",
        }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(50, {
            message: "La contraseña debe tener menos de 50 caracteres",
        }),
});

export type LogIn = z.infer<typeof logInSchema>;

export type GetAllResponse = {
    users: User[];
    total: number;
};
