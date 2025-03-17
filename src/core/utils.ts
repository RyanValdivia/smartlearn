import { z } from "zod";

export const createdAtSchema = z.string().datetime();
export const updatedAtSchema = z.string().datetime();
