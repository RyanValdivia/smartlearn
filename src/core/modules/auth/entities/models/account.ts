import { accountsTable } from "@@/drizzle/schemas/auth";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

export const accountSchema = createSelectSchema(accountsTable).omit({
    userId: true,
});

export type Account = z.infer<typeof accountSchema>;

export const createAccountSchema = createInsertSchema(accountsTable).omit({});

export type CreateAccount = z.infer<typeof createAccountSchema>;
