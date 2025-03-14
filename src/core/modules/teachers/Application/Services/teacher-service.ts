import { type PaginationResponse } from "@/core/api";
import {
    type CreateTeacher,
    type GetManyTeachersParams,
    type Teacher,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../../Domain/teacher-repository";
import { type ITeachersService } from "../../Domain/teacher-service";

export class TeachersService implements ITeachersService {
    constructor(private readonly teachersRepository: ITeachersRepository) {}

    getMany(
        params: GetManyTeachersParams,
    ): Promise<PaginationResponse<Teacher[]>> {
        return this.teachersRepository.getMany(params);
    }

    createTeacher(userId: string, input: CreateTeacher): Promise<Teacher> {
        return this.teachersRepository.createTeacher(userId, input);
    }
}
