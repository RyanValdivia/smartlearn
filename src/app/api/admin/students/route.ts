import { StudentsController } from "@/core/modules/students/Application/Controllers/student-controller";
import { type NextRequest } from "next/server";

const controller = new StudentsController();

export const POST = (req: NextRequest) => controller.create(req);

export const DELETE = (req: NextRequest) => controller.delete(req);
