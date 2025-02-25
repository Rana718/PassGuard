import config from "@/config/env";
import Redis from "ioredis";

interface Data{
    id: string;
    email: string;
    name: string;
    payload: string;
    hmac: string;
    otp: string;
}


export class RedisCache {
    public redis: Redis | undefined;

    constructor(){
        if(this.redis){
            console.log('Redis already connected');
            return ;
        }

        try{
            this.redis = new Redis({
                host: config.REDIS_HOST,
                port: Number(config.REDIS_PORT),
                password: config.REDIS_PASS
            })

            this.redis.on("error", (err) => {
                console.log(err);
            })
        }catch(err){
            throw new Error(`Redis connection failed: ${err}`);
        }
    }

    async feedCache(data: Data){
        if(!this.redis){
            throw new Error('Redis not connected');
        }

        try{
            await this.redis.hset(`user:${data.id}`, data);
            console.log('Data cached');
        }catch(err){
            console.log(err);
            throw new Error('Failed to cache data');
        }
    }
}
