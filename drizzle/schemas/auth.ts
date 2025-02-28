import {
  integer,
  text,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const userRoles = pgEnum("user_role", ["ADMIN", "STUDENT", "TEACHER"]);

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: varchar({ length: 255 }),
  role: userRoles("role").notNull().default("STUDENT"),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const accountsTable = pgTable(
  "accounts",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    type: varchar({ length: 255 }).notNull(),
    provider: varchar({ length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => [
    unique("provider_provider_account_id").on(
      table.provider,
      table.providerAccountId
    ),
  ]
);

export const sessionsTable = pgTable("sessions", {
  id: uuid().defaultRandom().primaryKey(),
});
