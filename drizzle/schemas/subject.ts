import { relations } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { lecturesTable } from "./lecture";

export const subjectArea = pgEnum("subject_area", [
    "SOCIALES",
    "BIOMEDICAS",
    "INGENIERIAS",
]);

export const subjectsTable = pgTable("subjects", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    weeklyHours: integer().notNull(),
    area: subjectArea().notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const subjectsRelations = relations(subjectsTable, ({ many }) => ({
    lectures: many(lecturesTable),
}));
