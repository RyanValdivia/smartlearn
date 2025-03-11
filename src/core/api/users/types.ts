import { type z } from "zod";
import type {
    userSchema,
    createUserSchema,
    teacherSchema,
    studentSchema,
    logInSchema,
} from "./schemas";
import { type APIResponse } from "..";
import { type PaginationParams } from "@/utils/types";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

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
    getMany: (params: GetManyUsersParams) => Promise<APIResponse<User[]>>;
};
