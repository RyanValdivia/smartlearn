import { getInjection } from "@/core/di/container";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page");

    const usersController = getInjection("UsersController");

    const users = await usersController.getFilteredUsers(query, page);

    return NextResponse.json(users);
}
