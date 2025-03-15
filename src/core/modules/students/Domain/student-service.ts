import { type PaginationResponse } from "@/core/api";
import {
    type Student,
    type GetManyStudentsParams,
    type CreateStudent,
} from "@/core/api/students/types";

export interface IStudentsService {
    getMany(
        params: GetManyStudentsParams,
    ): Promise<PaginationResponse<Student[]>>;

    createStudent(input: CreateStudent): Promise<Student>;
}
