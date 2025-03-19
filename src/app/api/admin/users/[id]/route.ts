import { UsersController } from "@/core/modules/auth/Application/Controllers/user-controller";
import { type NextRequest } from "next/server";

const controller = new UsersController();

export const GET = (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => controller.getOne(req, { params });
