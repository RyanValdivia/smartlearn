import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchemas from "./schemas/auth";
import * as cycleSchemas from "./schemas/cycle";
import * as studentSchemas from "./schemas/student";
import * as teacherSchemas from "./schemas/teacher";
import * as sectionSchemas from "./schemas/section";
import * as lectureSchemas from "./schemas/lecture";
import * as subjectSchemas from "./schemas/subject";

const schemas = {
    ...authSchemas,
    ...cycleSchemas,
    ...studentSchemas,
    ...teacherSchemas,
    ...sectionSchemas,
    ...lectureSchemas,
    ...subjectSchemas,
};

const pool = postgres(process.env.DATABASE_URL!, {
    max: 10, // Define el número máximo de conexiones en el pool
    idle_timeout: 30, // Tiempo en segundos antes de cerrar conexiones inactivas
    connect_timeout: 10, // Tiempo máximo de espera para establecer conexión
});

export const db = drizzle(pool, {
    schema: schemas,
});
