import { type CreateTeacher } from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../Domain/teacher-repository";
import { type PrismaClient, type Teacher, UserRole } from "@prisma/client";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
@injectable()
export class TeachersRepository implements ITeachersRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}

    async createTeacher(input: CreateTeacher): Promise<Teacher> {
        return await this._client.teacher.create({
            data: {
                user: {
                    create: {
                        dni: input.dni,
                        email: input.email,
                        name: input.name,
                        role: UserRole.TEACHER,
                    },
                },
            },
        });
    }

    async deleteTeacher(id: string): Promise<Teacher> {
        const teacher = await this._client.teacher.findUnique({
            where: {
                id: id,
            },
        });

        if (!teacher) {
            throw new Error("Teacher not found");
        }

        return await this._client.teacher.delete({
            where: {
                id: id,
            },
        });
    }
}
