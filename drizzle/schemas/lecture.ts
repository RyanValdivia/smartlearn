import { relations } from "drizzle-orm";
import {
    integer,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { subjectsTable } from "./subject";
import { teachersTable } from "./teacher";

export const lecturesTable = pgTable("lectures", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    subjectId: integer().notNull(),
    teacherId: uuid().notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const lecturesRelations = relations(lecturesTable, ({ one }) => ({
    subject: one(subjectsTable, {
        fields: [lecturesTable.subjectId],
        references: [subjectsTable.id],
    }),
    teacher: one(teachersTable, {
        fields: [lecturesTable.teacherId],
        references: [teachersTable.id],
    }),
}));
