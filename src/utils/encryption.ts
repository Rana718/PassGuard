import config from "@/config/env"
import crypto from 'crypto';

const AES_KEY = Buffer.from(config.AES_KEY_HEX as string, "hex");

const encryption = (data: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv);
    let encryption = cipher.update(data, 'utf8', 'hex');
    encryption += cipher.final('hex');

    const payload = iv.toString('hex') + encryption;
    const hmac = crypto.createHmac('sha256', config.HMAC_KEY as string).update(payload).digest('hex');

    return { payload, hmac };
}

export default encryption;