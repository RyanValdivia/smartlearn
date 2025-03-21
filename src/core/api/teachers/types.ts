import { type PaginationParams } from "@/utils/types";
import { type APIPaginationResponse } from "..";
import { type Jsonify } from "type-fest";
import { type Teacher } from "@prisma/client";
import { z } from "zod";
import { createTeacherSchema } from "./schemas";

export type TeacherFromAPI = Jsonify<Teacher>;

export type CreateTeacher = z.infer<typeof createTeacherSchema>;
