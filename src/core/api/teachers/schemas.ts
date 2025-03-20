import { z } from "zod";
import { type ZodInferSchema } from "../types";
import { type TeacherFromAPI } from "./types";
import { createdAtSchema, updatedAtSchema } from "@/core/utils";

export const teacherSchema = z.object<ZodInferSchema<TeacherFromAPI>>({
    id: z.string().cuid(),
    userId: z.string().cuid(),
    createdAt: createdAtSchema,
    updatedAt: updatedAtSchema,
});

export const createTeacherSchema = z.object({
    dni: z.string(),
    email: z.string().email(),
    name: z.string(),
});
