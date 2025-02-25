import { Config } from "drizzle-kit";

export default {
    schema: "./drizzle/schema.ts",
    out: "./drizzle/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    dialect: "postgresql"
} satisfies Config