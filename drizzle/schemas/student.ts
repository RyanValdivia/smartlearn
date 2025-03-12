import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";
import { sectionsToStudentsTable } from "./section";

export const studentsTable = pgTable("students", {
    id: uuid().primaryKey(),
    userId: uuid()
        .notNull()
        .unique()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    dni: varchar({ length: 8 }).notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const studentsRelations = relations(studentsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [studentsTable.userId],
        references: [usersTable.id],
    }),
    sections: many(sectionsToStudentsTable),
}));
