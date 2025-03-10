import { relations } from "drizzle-orm";
import { integer, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { studentsTable } from "./student";
import { enumToPgEnum } from "@/utils/types";
import { cyclesTable } from "./cycle";

export enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
}

export const usersRoles = pgEnum("user_role", enumToPgEnum(UserRole));

export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique(),
    emailVerified: timestamp(),
    image: varchar({ length: 255 }),

    dni: varchar({ length: 8 }).notNull().unique(),
    password: varchar({ length: 255 }),

    role: usersRoles().notNull().default(UserRole.STUDENT),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const accountsTable = pgTable(
    "accounts",
    {
        userId: uuid().notNull(),
        type: varchar({ length: 255 }).notNull(),
        provider: varchar({ length: 255 }).notNull(),
        providerAccountId: varchar({
            length: 255,
        }).notNull(),
        refresh_token: text("refreshToken"),
        access_token: text("accessToken"),
        expires_at: integer("expiresAt"),
        token_type: varchar("tokenType", { length: 255 }),
        scope: varchar({ length: 255 }),
        id_token: text("idToken"),
        session_state: varchar("sessionState", { length: 255 }),
    },
    (account) => [
        primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    ],
);
// permite nulos hasta que haigan mas datos en la bd
export const sessionsTable = pgTable("sessions", {
    sessionToken: varchar({ length: 255 }).notNull().primaryKey(),
    userId: uuid().notNull(),
    expires: timestamp().notNull(),
    sessionRole: usersRoles(),
    cycleId: integer(),
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

export const usersRelations = relations(usersTable, ({ one, many }) => ({
    accounts: many(accountsTable),
    sessions: many(sessionsTable),

    student: one(studentsTable),
    teacher: one(studentsTable),
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
    cycle: one(cyclesTable, {
        fields: [sessionsTable.cycleId],
        references: [cyclesTable.id],
    }),
}));
