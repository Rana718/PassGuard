import { RedisCache } from '@/cache/redis';
import EmailjsMessage from '@/services/Emailjs';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const redis = new RedisCache();

export async function POST(req: Request) {
    try {
        const { name, email, payload, hmac } = await req.json();
        const id = uuidv4();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const { message, status } = await EmailjsMessage.sendOtp({
            username: name,
            otp,
            email,
            type: 'new_users'
        })

        if(!status) {
            return NextResponse.json({ error: message }, { status: 500 });
        }

        await redis.feedCache({ id, email, name, payload, hmac, otp });
        return NextResponse.json({ message: 'OTP sent successfully', id }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}


