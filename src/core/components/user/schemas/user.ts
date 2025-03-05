import { usersTable } from "@@/drizzle";
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

//auth schemas
