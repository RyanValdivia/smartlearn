import { z } from "zod";

export const apiResponseSchema = <T extends z.ZodSchema>(data: T) =>
    z.object({
        message: z.string(),
        response: z.object({
            data: data,
            total: z.number(),
        }),
    });
