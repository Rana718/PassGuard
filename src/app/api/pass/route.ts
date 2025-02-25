import { prisma } from "@/Prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';



export async function POST(req: Request) {
    const { userid, websitename, url, username, payload, hmac } = await req.json();

    if (!userid || !username || !payload || !hmac) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const id = uuidv4();

    try {
        await prisma.storePassword.create({
            data: {
                id,
                userId: userid,
                websiteName: websitename,
                url,
                username,
                passwordpayload: payload,
                passwordhmac: hmac
            }
        })

        return NextResponse.json({ message: "Password stored successfully", id }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to store password" }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
        const { id, userid, websitename, url, username } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "ID is required for updating" }, { status: 400 });
        }

        const updateData: {
            userId?: string;
            websiteName?: string;
            url?: string;
            username?: string;
        } = {};

        if (userid !== undefined) updateData.userId = userid;
        if (websitename !== undefined) updateData.websiteName = websitename;
        if (url !== undefined) updateData.url = url;
        if (username !== undefined) updateData.username = username;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
        }

        const updatedRecord = await prisma.storePassword.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(
            { message: "Password entry updated successfully", updatedRecord },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update password entry" }, { status: 500 });
    }
}
