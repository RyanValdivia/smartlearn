import { type PaginationParams } from "@/utils/types";
import { type APIPaginationResponse } from "..";
import { type Jsonify } from "type-fest";
import { type Teacher } from "@prisma/client";

export type TeacherFromAPI = Jsonify<Teacher>;

export type CreateTeacher = Omit<
    TeacherFromAPI,
    "id" | "createdAt" | "updatedAt"
>;

export type TeacherQueryFilters = {
    fullTextSearch?: string;
};

export type GetManyTeachersParams = {
    filters: PaginationParams<TeacherQueryFilters>;
};

export type TeacherAPI = {
    getMany: (
        params: GetManyTeachersParams,
    ) => Promise<APIPaginationResponse<TeacherFromAPI[]>>;
};
