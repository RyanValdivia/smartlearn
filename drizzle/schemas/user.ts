import { varchar } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userRoles = pgEnum("user_role", [
    "ADMIN",
    "STUDENT",
    "TEACHER",
])

export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    image: varchar({ length: 255 }),
    
    role: userRoles("role").notNull().default("STUDENT"),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()),
});