import { type z } from "zod";

import type { logInSchema } from "./forms";
import { type APIPaginationResponse } from "..";
import { type PaginationParams } from "@/utils/types";
import { type Jsonify } from "type-fest";
import { type UserRole, type User } from "@prisma/client";
import { type createUserSchema } from "./schemas";

export type UserFromAPI = Jsonify<User>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUser = Partial<CreateUser>;

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
    ) => Promise<APIPaginationResponse<UserFromAPI[]>>;
};
export { User };
