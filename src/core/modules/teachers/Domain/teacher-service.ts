import { type CreateTeacher } from "@/core/api/teachers/types";
import { type Teacher } from "@prisma/client";

export interface ITeachersService {
    createTeacher(input: CreateTeacher): Promise<Teacher>;

    deleteTeacher(id: string): Promise<Teacher>;
}
