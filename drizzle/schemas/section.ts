import { relations } from "drizzle-orm";
import {
    integer,
    pgTable,
    primaryKey,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { cyclesTable } from "./cycle";
import { studentsTable } from "./student";

export const sectionsTable = pgTable("sections", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    studentLimit: integer().notNull(),

    cycleId: integer().notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const sectionsRelations = relations(sectionsTable, ({ one, many }) => ({
    cycle: one(cyclesTable, {
        fields: [sectionsTable.cycleId],
        references: [cyclesTable.id],
    }),
    students: many(sectionsToStudentsTable),
}));

export const sectionsToStudentsTable = pgTable(
    "sections_to_students",
    {
        sectionId: integer().notNull(),
        studentId: uuid().notNull(),
        enrollmentDate: timestamp().defaultNow(),
    },
    (table) => [
        primaryKey({
            columns: [table.sectionId, table.studentId],
        }),
    ],
);

export const sectionsToStudentsRelations = relations(
    sectionsToStudentsTable,
    ({ one }) => ({
        section: one(sectionsTable, {
            fields: [sectionsToStudentsTable.sectionId],
            references: [sectionsTable.id],
        }),
        student: one(studentsTable, {
            fields: [sectionsToStudentsTable.studentId],
            references: [studentsTable.id],
        }),
    }),
);