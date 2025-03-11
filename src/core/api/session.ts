import { sessionsTable } from "@@/drizzle/schemas/auth";
import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

export const sessionSchema = createSelectSchema(sessionsTable);

export type Session = z.infer<typeof sessionSchema>;
