import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().nullable(),
    role: z.enum(["ADMIN", "STUDENT", "TEACHER"]),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
});

export type User = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type CreateUser = z.infer<typeof createUserSchema>;