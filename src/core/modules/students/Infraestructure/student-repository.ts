import { inject, injectable } from "inversify";
import { type IStudentsRepository } from "../Domain/student-repository";
import { DI_SYMBOLS } from "@/core/di/types";
import { type PrismaClient, type Student, UserRole } from "@prisma/client";
import { type CreateStudent } from "@/core/api/students/types";

@injectable()
export class StudentsRepository implements IStudentsRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}

    async createStudent(input: CreateStudent): Promise<Student> {
        const user = this._client.user.findUnique({
            where: {
                id: input.userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        await this._client.user.update({
            where: {
                id: input.userId,
            },
            data: {
                role: UserRole.STUDENT,
            },
        });

        return await this._client.student.create({
            data: {
                user: {
                    connect: {
                        id: input.userId,
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
            throw new Error("Student not found");
        }

        return await this._client.student.delete({
            where: {
                id: id,
            },
        });
    }
}
