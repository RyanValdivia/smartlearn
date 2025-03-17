import {
    type CreateTeacher,
    type TeacherFromAPI,
} from "@/core/api/teachers/types";

export interface ITeachersService {
    createTeacher(input: CreateTeacher): Promise<TeacherFromAPI>;
}
