// import { type PaginationResponse } from "@/core/api";
import {
    type TeacherFromAPI,
    type CreateTeacher,
    // type GetManyTeachersParams,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../../Domain/teacher-repository";
import { type ITeachersService } from "../../Domain/teacher-service";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
@injectable()
export class TeachersService implements ITeachersService {
    constructor(
        @inject(DI_SYMBOLS.ITeachersRepository)
        private _teachersRepository: ITeachersRepository,
    ) {}

    // getMany(
    //     params: GetManyTeachersParams,
    // ): Promise<PaginationResponse<Teacher[]>> {
    //     return this.teachersRepository.getMany(params);
    // }

    createTeacher(input: CreateTeacher): Promise<TeacherFromAPI> {
        return this._teachersRepository.createTeacher(input);
    }
}
