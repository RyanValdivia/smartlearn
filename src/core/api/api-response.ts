import { z } from "zod";

export const apiResponsePaginationSchema = <T extends z.ZodSchema>(data: T) =>
    z.object({
        message: z.string(),
        response: z.object({
            data: data,
            total: z.number(),
        }),
    });

export const apiResponseSchema = <T extends z.ZodSchema>(data: T) =>
    z.object({
        message: z.string(),
        data: data,
    });
