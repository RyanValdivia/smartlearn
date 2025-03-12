import { type z } from "zod";
import type {
    userSchema,
    createUserSchema,
    teacherSchema,
    studentSchema,
    updateUserSchema,
} from "./schemas";
import type { logInSchema } from "./forms";
import { type APIPaginationResponse } from "..";
import { type PaginationParams } from "@/utils/types";
import { type UserRole } from "@@/drizzle/schemas/auth";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUser = z.infer<typeof updateUserSchema>;

export type CreateUserForm = z.input<typeof createUserSchema>;

export type Teacher = z.infer<typeof teacherSchema>;

export type Student = z.infer<typeof studentSchema>;

export type LogIn = z.infer<typeof logInSchema>;

export type UserQueryFilters = {
    fullTextSearch?: string;
    role?: UserRole;
};

export type GetManyUsersParams = {
    filters: PaginationParams<UserQueryFilters>;
};

export type UserAPI = {
    getMany: (
        params: GetManyUsersParams,
    ) => Promise<APIPaginationResponse<User[]>>;
};
