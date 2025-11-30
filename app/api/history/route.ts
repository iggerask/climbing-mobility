import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"; // Need to create this
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { sessionId, duration } = body;

        // Ensure user exists in DB (sync with Clerk)
        // In a real app, you'd use webhooks, but this is a simple way to ensure it exists
        await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: {
                id: userId,
                email: "placeholder@example.com", // Clerk doesn't expose email easily in auth(), would need more setup
            },
        });

        const session = await prisma.session.create({
            data: {
                userId,
                type: sessionId,
                duration: duration,
            },
        });

        return NextResponse.json(session);
    } catch (error) {
        console.error("[HISTORY_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
