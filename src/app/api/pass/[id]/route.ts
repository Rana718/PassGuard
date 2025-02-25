import { prisma } from "@/Prisma";
import { NextResponse } from "next/server";


export async function DELETE({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.storePassword.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Password deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete password" }, { status: 500 });
    }

}