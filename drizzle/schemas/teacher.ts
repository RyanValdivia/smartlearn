import { relations } from "drizzle-orm";
import {
    integer,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./auth";
import { lecturesTable } from "./lecture";

export const teachersTable = pgTable("teachers", {
    id: uuid().primaryKey(),
    userId: uuid().notNull().unique(),
    dni: varchar({ length: 8 }).notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const teacherRelations = relations(teachersTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [teachersTable.userId],
        references: [usersTable.id],
    }),
    lectures: many(lecturesTable),
}));
