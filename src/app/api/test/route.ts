import { NextResponse } from "next/server";
import { db } from "@/drizzle";

export async function GET() {
    try {
        const allUsers = db.select();
        return NextResponse.json({ success: true, data: allUsers });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}