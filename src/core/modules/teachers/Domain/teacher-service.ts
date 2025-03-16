import { type PaginationResponse } from "@/core/api";
import {
    type Teacher,
    type GetManyTeachersParams,
    type CreateTeacher,
} from "@/core/api/teachers/types";

export interface ITeachersService {
    getMany(
        params: GetManyTeachersParams,
    ): Promise<PaginationResponse<Teacher[]>>;

    createTeacher(input: CreateTeacher): Promise<Teacher>;
}
