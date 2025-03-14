import { getInjection } from "@/core/di/container";
import { type NextRequest } from "next/server";

const controller = getInjection("SessionsController");

export const GET = (req: NextRequest) => controller.findByToken(req);
