import { RedisCache } from "@/cache/redis";
import { prisma } from "@/Prisma";
import EmailjsMessage from "@/services/Emailjs";
import { NextResponse } from "next/server";


const redis = new RedisCache();

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const data = await prisma.user.findUnique({
            where: {
                email: id
            }
        })

        if (!data) {
            return NextResponse.json({ error: "No data found" }, { status: 404 })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const { message, status } = await EmailjsMessage.sendOtp({
            username: data.name,
            otp,
            email: data.email,
            type: 'reset_password'
        })

        if (!status) {
            return NextResponse.json({ error: message }, { status: 500 });
        }

        await redis.feedCache({ id, otp });
        return NextResponse.json({ message: 'OTP sent successfully', id }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
    }
}