import { type PaginationResponse } from "@/core/api";
import {
    type Teacher,
    type GetManyTeachersParams,
    type CreateTeacher,
} from "@/core/api/teachers/types";

export interface ITeachersRepository {
    getMany(
        params?: GetManyTeachersParams,
    ): Promise<PaginationResponse<Teacher[]>>;

    createTeacher(userId: string, input: CreateTeacher): Promise<Teacher>;
}
