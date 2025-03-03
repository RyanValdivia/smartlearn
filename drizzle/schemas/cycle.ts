import { relations } from "drizzle-orm";
import {
    boolean,
    pgEnum,
    pgTable,
    real,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { sectionsTable } from "./section";

export const cycleModes = pgEnum("cycle_mode", [
    "IN_PERSON",
    "VIRTUAL",
    "HYBRID",
]);

export const cyclesTable = pgTable("cycles", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    mode: cycleModes().notNull().default("IN_PERSON"),
    monthlyTuition: real().notNull(),
    startDate: timestamp().notNull(),
    endDate: timestamp().notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const cyclesRelations = relations(cyclesTable, ({ many }) => ({
    sections: many(sectionsTable),
}));
