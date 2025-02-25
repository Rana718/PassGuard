import config from "@/config/env";
import Redis from "ioredis";

interface Data {
    id: string;
    otp: string;
    email?: string;
    name?: string;
    payload?: string;
    hmac?: string;
}

export class RedisCache {
    public redis: Redis | undefined;

    constructor() {
        if (this.redis) {
            console.log("Redis already connected");
            return;
        }

        try {
            this.redis = new Redis({
                host: config.REDIS_HOST,
                port: Number(config.REDIS_PORT),
                password: config.REDIS_PASS,
            });

            this.redis.on("error", (err) => {
                console.log(err);
            });
        } catch (err) {
            throw new Error(`Redis connection failed: ${err}`);
        }
    }

    async feedCache(data: Data) {
        if (!this.redis) {
            throw new Error("Redis not connected");
        }

        try {
            await this.redis.hset(`user:${data.id}`, {
                id: data.id,
                otp: data.otp,
            });

            if (data.payload || data.hmac || data.email || data.name) {
                await this.redis.hset(`user:${data.id}:personal`, {
                    payload: data.payload || "",
                    hmac: data.hmac || "",
                    email: data.email || "",
                    name: data.name || "",
                });
            }

            console.log("Data cached");
        } catch (err) {
            console.log(err);
            throw new Error("Failed to cache data");
        }
    }

    async getUserInfo(id: string): Promise<Data | null> {
        if (!this.redis) {
            throw new Error("Redis not connected");
        }

        try {
            const data = await this.redis.hgetall(`user:${id}`);
            if (!data || Object.keys(data).length === 0) return null;

            const personal = await this.redis.hgetall(`user:${id}:personal`);

            return {
                id: data.id,
                otp: data.otp,
                email: data.email || undefined,
                name: data.name || undefined,
                payload: personal.payload || undefined,
                hmac: personal.hmac || undefined,
            } as Data;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to get data from cache");
        }
    }
}
