import { sessionsTable } from "@@/drizzle/schemas/auth";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { type GetByTokenSessionParams } from "./types";
import { type ZodInferSchema } from "../types";

export const findByTokenSchema = z.object<
    ZodInferSchema<GetByTokenSessionParams>
>({
    token: z.string(),
});

export const sessionSchema = createSelectSchema(sessionsTable);

//DEPRECATED
// export const sessionRouter = contract.router({
//     getByToken: {
//         method: "POST",
//         path: "/api/sessions",
//         headers: z.object({
//             "Content-Type": z.literal("application/json"),
//         }),
//         body: findByTokenSchema,
//         summary: "Obtener una session por el token",
//         responses: contract.responses({
//             200: apiResponseSchema(sessionSchema),
//         }),
//     },
// } satisfies TypedAppRouter<SessionAPI>);
