
import { redis } from "@/cache";
import { prisma } from "@/Prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request){

    const { id, otp, payload, hmac } = await req.json();
    
    if (!id || !otp || !payload || !hmac) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const Data = await redis.getUserInfo(id);

    if (!Data) {
        return NextResponse.json({ error: "User data not found" }, { status: 400 });
    }

    if (Data.otp !== otp) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    try{
        await prisma.user.update({
            where: { id },
            data:{
                passwordpayload: payload,
                passwordhmac: hmac
            }
        })
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
    }
   
}