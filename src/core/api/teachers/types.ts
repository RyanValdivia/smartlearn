import { type Jsonify } from "type-fest";
import { type Teacher } from "@prisma/client";
import { type z } from "zod";
import { type createTeacherSchema } from "./schemas";

export type TeacherFromAPI = Jsonify<Teacher>;

export type CreateTeacher = z.infer<typeof createTeacherSchema>;
