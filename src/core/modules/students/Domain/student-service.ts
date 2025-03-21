import { type CreateStudent } from "@/core/api/students/types";
import { type Student } from "@prisma/client";

export interface IStudentsService {
    createStudent(input: CreateStudent): Promise<Student>;

    deleteStudent(id: string): Promise<Student>;
}
