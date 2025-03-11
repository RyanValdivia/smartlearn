import { getInjection } from "@/core/di/container";
import { type NextRequest } from "next/server";
const controller = getInjection("UsersController");

export const GET = (req: NextRequest) => controller.getMany(req);
