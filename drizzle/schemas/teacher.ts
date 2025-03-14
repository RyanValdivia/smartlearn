import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";
import { lecturesTable } from "./lecture";

export const teachersTable = pgTable("teachers", {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid().notNull().unique(),

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
