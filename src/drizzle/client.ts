import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle({
    connection: {
        ssl: true,
        url: process.env.DATABASE_URL!,
    }
});
