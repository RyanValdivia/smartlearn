import {
    type CreateTeacher,
    type TeacherFromAPI,
} from "@/core/api/teachers/types";

export interface ITeachersRepository {
    createTeacher(input: CreateTeacher): Promise<TeacherFromAPI>;
}
