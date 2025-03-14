import { type z } from "zod";
import {
    type updateTeacherSchema,
    type createTeacherSchema,
    type teacherSchema,
} from "./schemas";
import { type PaginationParams } from "@/utils/types";
import { type APIPaginationResponse } from "..";

export type Teacher = z.infer<typeof teacherSchema>;

export type CreateTeacher = z.input<typeof createTeacherSchema>;

export type UpdateTeacher = z.input<typeof updateTeacherSchema>;

export type TeacherQueryFilters = {
    fullTextSearch?: string;
};

export type GetManyTeachersParams = {
    filters: PaginationParams<TeacherQueryFilters>;
};

export type TeacherAPI = {
    getMany: (
        params: GetManyTeachersParams,
    ) => Promise<APIPaginationResponse<Teacher[]>>;
};
