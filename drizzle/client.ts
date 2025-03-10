import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchemas from "./schemas/auth";

const queryClient = postgres(process.env.DATABASE_URL!);

const schemas = {
    ...authSchemas,
};

export const db = drizzle({
    connection: { url: process.env.DATABASE_URL! },
    client: queryClient,
    schema: schemas,
});
