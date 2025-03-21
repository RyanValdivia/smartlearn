import { type PaginationParams } from "@/utils/types";
import { type z } from "zod";
import { type PaginationResponse } from "..";
import { type Jsonify } from "type-fest";
import { type Student } from "@prisma/client";
import { type createStudentSchema } from "./schemas";

export type StudentFromAPI = Jsonify<Student>;

export type CreateStudent = z.infer<typeof createStudentSchema>;

export type StudentQueryFilters = {
    fullTextSearch?: string;
};

export type GetManyStudentsParams = {
    filters: PaginationParams<StudentQueryFilters>;
};

export type StudentAPI = {
    getMany: (
        params: GetManyStudentsParams,
    ) => Promise<PaginationResponse<StudentFromAPI[]>>;
};
