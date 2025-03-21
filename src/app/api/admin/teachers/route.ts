import { TeachersController } from "@/core/modules/teachers/Application/Controllers/teacher-controller";
import { type NextRequest } from "next/server";

const controller = new TeachersController();

export const POST = (req: NextRequest) => controller.create(req);

export const DELETE = (req: NextRequest) => controller.delete(req);
