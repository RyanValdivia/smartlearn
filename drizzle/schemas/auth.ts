import { relations } from "drizzle-orm";
import {
    integer,
    primaryKey,
    text,
    unique,
    varchar,
} from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const usersRoles = pgEnum("user_role", ["ADMIN", "STUDENT", "TEACHER"]);

export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    emailVerified: timestamp("email_verified"),
    image: varchar({ length: 255 }),

    role: usersRoles("role").notNull().default("STUDENT"),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const accountsTable = pgTable(
    "accounts",
    {
        userId: uuid("user_id").notNull(),
        type: varchar({ length: 255 }).notNull(),
        provider: varchar({ length: 255 }).notNull(),
        providerAccountId: varchar("provider_account_id", {
            length: 255,
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar({ length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => [
        primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    ],
);

export const sessionsTable = pgTable("sessions", {
    sessionToken: varchar("session_token", { length: 255 })
        .notNull()
        .primaryKey(),
    userId: uuid("user_id").notNull(),
    expires: timestamp().notNull(),
});

export const verificationTokensTable = pgTable(
    "verification_tokens",
    {
        identifier: varchar({ length: 255 }).notNull(),
        token: varchar({ length: 255 }).notNull(),
        expires: timestamp().notNull(),
    },
    (verificationToken) => [
        primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    ],
);

// ? Relations

export const usersRelations = relations(usersTable, ({ many }) => ({
    accounts: many(accountsTable),
    sessions: many(sessionsTable),
}));

export const accountsRelations = relations(accountsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [accountsTable.userId],
        references: [usersTable.id],
    }),
}));

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.userId],
        references: [usersTable.id],
    }),
}));
