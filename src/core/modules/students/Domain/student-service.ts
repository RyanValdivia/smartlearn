import { type PaginationResponse } from "@/core/api";
import {
    type StudentFromAPI,
    type GetManyStudentsParams,
    type CreateStudent,
} from "@/core/api/students/types";

export interface IStudentsService {
    getMany(
        params: GetManyStudentsParams,
    ): Promise<PaginationResponse<StudentFromAPI[]>>;

    createStudent(input: CreateStudent): Promise<StudentFromAPI>;
}
