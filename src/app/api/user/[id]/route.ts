import { prisma } from "@/Prisma";
import { NextResponse } from "next/server";



export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const data = await prisma.storePassword.findMany({
            where: {
                userId: id
            }
        })

        if (data.length === 0) {
            return NextResponse.json({ error: "No data found" }, { status: 404 })
        }

        return NextResponse.json(data, { status: 200 })
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}

