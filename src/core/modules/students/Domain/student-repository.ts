import { type CreateStudent } from "@/core/api/students/types";
import { type Student } from "@prisma/client";

export interface IStudentsRepository {
    createStudent(input: CreateStudent): Promise<Student>;

    deleteStudent(id: string): Promise<Student>;
}
