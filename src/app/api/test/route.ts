import { NextResponse } from "next/server";
import { db, usersTable } from "../../../../drizzle";

export async function GET() {
    try {
        const allUsers = await db.select().from(usersTable);
        return NextResponse.json({ success: true, data: allUsers });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}