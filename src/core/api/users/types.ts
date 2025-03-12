import { type z } from "zod";
import type {
    userSchema,
    createUserSchema,
    teacherSchema,
    studentSchema,
    logInSchema,
    updateUserSchema,
} from "./schemas";
import { type APIPaginationResponse } from "..";
import { type PaginationParams } from "@/utils/types";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUser = z.infer<typeof updateUserSchema>;

export type Teacher = z.infer<typeof teacherSchema>;

export type Student = z.infer<typeof studentSchema>;

export type LogIn = z.infer<typeof logInSchema>;

export type UserQueryFilters = {
    fullTextSearch?: string;
};

export type GetManyUsersParams = {
    filters: PaginationParams<UserQueryFilters>;
};

export type UserAPI = {
    getMany: (
        params: GetManyUsersParams,
    ) => Promise<APIPaginationResponse<User[]>>;
};
