import { type PaginationParams } from "@/utils/types";
import { type z } from "zod";
import {
    type updateStudentSchema,
    type createStudentSchema,
    type studentSchema,
} from "./schemas";
import { type PaginationResponse } from "..";

export type Student = z.infer<typeof studentSchema>;

export type CreateStudent = z.input<typeof createStudentSchema>;

export type UpdateStudent = z.input<typeof updateStudentSchema>;

export type StudentQueryFilters = {
    fullTextSearch?: string;
};

export type GetManyStudentsParams = {
    filters: PaginationParams<StudentQueryFilters>;
};

export type StudentAPI = {
    getMany: (
        params: GetManyStudentsParams,
    ) => Promise<PaginationResponse<Student[]>>;
};
