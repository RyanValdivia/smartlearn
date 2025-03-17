import {
    type TeacherFromAPI,
    type CreateTeacher,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../Domain/teacher-repository";
import { jsonify } from "@/lib/utils";
import { type PrismaClient, UserRole } from "@prisma/client";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
@injectable()
export class TeachersRepository implements ITeachersRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}
    async createTeacher(input: CreateTeacher): Promise<TeacherFromAPI> {
        const user = await this._client.user.findUnique({
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
                role: UserRole.TEACHER,
            },
        });

        const teacher = await this._client.teacher.create({
            data: {
                userId: input.userId,
            },
        });

        return jsonify(teacher);
    }
}
