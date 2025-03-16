import {
    type TeacherFromAPI,
    type CreateTeacher,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../Domain/teacher-repository";
import { db } from "@/core/server/db";
import { jsonify } from "@/lib/utils";
import { UserRole } from "@prisma/client";

export class TeachersRepository implements ITeachersRepository {
    async createTeacher(input: CreateTeacher): Promise<TeacherFromAPI> {
        const user = await db.user.findUnique({
            where: {
                id: input.userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        await db.user.update({
            where: {
                id: input.userId,
            },
            data: {
                role: UserRole.TEACHER,
            },
        });

        const teacher = await db.teacher.create({
            data: {
                userId: input.userId,
            },
        });

        return jsonify(teacher);
    }
}
