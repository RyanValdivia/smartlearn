import { inject, injectable } from "inversify";
import { type IStudentsRepository } from "../Domain/student-repository";
import { DI_SYMBOLS } from "@/core/di/types";
import { type PrismaClient, type Student, UserRole } from "@prisma/client";
import { type CreateStudent } from "@/core/api/students/types";
import { hashPassword } from "@/core/api/hash";
import { StudentNotFoundError, UserAlreadyExistsError } from "../Errors/errors";

@injectable()
export class StudentsRepository implements IStudentsRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}

    async createStudent(input: CreateStudent): Promise<Student> {
        const user = await this._client.user.findUnique({
            where: {
                dni: input.dni,
            },
        });

        if (user) {
            throw new UserAlreadyExistsError();
        }

        const password = await hashPassword(input.password);

        return await this._client.student.create({
            data: {
                user: {
                    create: {
                        dni: input.dni,
                        password: password,
                        name: input.name,
                        role: UserRole.STUDENT,
                    },
                },
            },
        });
    }

    async deleteStudent(id: string): Promise<Student> {
        const student = this._client.student.findUnique({
            where: {
                id: id,
            },
        });

        if (!student) {
            throw new StudentNotFoundError();
        }

        return await this._client.student.delete({
            where: {
                id: id,
            },
        });
    }
}
