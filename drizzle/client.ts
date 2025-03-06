import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);

export const db = drizzle({
    connection: { url: process.env.DATABASE_URL! },
    client: queryClient,
});
