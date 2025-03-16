// import { type PaginationResponse } from "@/core/api";
import {
    type TeacherFromAPI,
    type CreateTeacher,
    // type GetManyTeachersParams,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../../Domain/teacher-repository";
import { type ITeachersService } from "../../Domain/teacher-service";

export class TeachersService implements ITeachersService {
    constructor(private readonly teachersRepository: ITeachersRepository) {}

    // getMany(
    //     params: GetManyTeachersParams,
    // ): Promise<PaginationResponse<Teacher[]>> {
    //     return this.teachersRepository.getMany(params);
    // }

    createTeacher(input: CreateTeacher): Promise<TeacherFromAPI> {
        return this.teachersRepository.createTeacher(input);
    }
}
