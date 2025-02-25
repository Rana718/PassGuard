import { redis } from "@/cache";
import { prisma } from "@/Prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { userid, otp } = await req.json();

        if (!userid || !otp) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const userData = await redis.getUserInfo(userid);

        if (!userData) {
            return NextResponse.json({ error: "User data not found" }, { status: 400 });
        }

        if (userData.otp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userid
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: "User already" }, { status: 400 });
        }

        await prisma.user.create({
            data: {
                id: userid,
                email: userData.email || "",
                name: userData.name || "",
                passwordpayload: userData.payload || "",
                passwordhmac: userData.hmac || ""
            }
        })

        return NextResponse.json({ message: "User created successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}