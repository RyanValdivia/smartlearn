import { type CreateTeacher } from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../../Domain/teacher-repository";
import { type ITeachersService } from "../../Domain/teacher-service";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
import { type Teacher } from "@prisma/client";

@injectable()
export class TeachersService implements ITeachersService {
    constructor(
        @inject(DI_SYMBOLS.ITeachersRepository)
        private _teachersRepository: ITeachersRepository,
    ) {}

    createTeacher(input: CreateTeacher): Promise<Teacher> {
        return this._teachersRepository.createTeacher(input);
    }

    deleteTeacher(id: string): Promise<Teacher> {
        return this._teachersRepository.deleteTeacher(id);
    }
}
