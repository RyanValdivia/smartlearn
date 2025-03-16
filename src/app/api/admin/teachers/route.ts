import { getInjection } from "@/core/di/container";
import { type NextRequest } from "next/server";

const controller = getInjection("TeachersController");

// export const GET = (req: NextRequest) => controller.getMany(req);

export const POST = (req: NextRequest) => controller.create(req);
