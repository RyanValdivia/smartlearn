import { type Config } from "drizzle-kit";

export default {
    schema: "./drizzle/schemas",
    out: "./drizzle/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    dialect: "postgresql",
} satisfies Config;
