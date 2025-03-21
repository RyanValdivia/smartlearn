import { inject, injectable } from "inversify";
import { type IStudentsService } from "../../Domain/student-service";
import { type CreateStudent } from "@/core/api/students/types";
import { type Student } from "@prisma/client";
import { DI_SYMBOLS } from "@/core/di/types";
import { type IStudentsRepository } from "../../Domain/student-repository";

@injectable()
export class StudentsService implements IStudentsService {
    constructor(
        @inject(DI_SYMBOLS.IStudentsRepository)
        private _studentsRepository: IStudentsRepository,
    ) {}

    createStudent(input: CreateStudent): Promise<Student> {
        return this._studentsRepository.createStudent(input);
    }

    deleteStudent(id: string): Promise<Student> {
        return this._studentsRepository.deleteStudent(id);
    }
}
