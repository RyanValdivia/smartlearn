import { UsersController } from "@/core/modules/auth/Application/Controllers/user-controller";
import { type NextRequest } from "next/server";

const controller = new UsersController();

export const GET = (req: NextRequest) => controller.getMany(req);

export const PUT = (req: NextRequest) => controller.update(req);

export const DELETE = (req: NextRequest) => controller.delete(req);
