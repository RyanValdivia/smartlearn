import { PrismaClient } from "@prisma/client";
import { env } from "process";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        transactionOptions: {
            timeout: 10 * 1000,
        },
    });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
