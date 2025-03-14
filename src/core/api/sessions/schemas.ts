import { z } from "zod";

export const findByTokenSchema = z.object({
    token: z.string(),
});
