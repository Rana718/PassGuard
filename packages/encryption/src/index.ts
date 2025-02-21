import { env } from "@passgurd/env"
import crypto from 'crypto';

const AES_KEY = Buffer.from(env.AES_KEY_HEX as string, 'hex');

const encryption = (data: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, iv);
    let encryption = cipher.update(data, 'utf8', 'hex');
    encryption += cipher.final('hex');

    const payload = iv.toString('hex') + encryption;
    const hmac = crypto.createHmac('sha256', env.HMAC_KEY as string).update(payload).digest('hex');

    return { payload, hmac };
}

const decryption = (payload: string, hmac: string) => {
    const calculatedHmac = crypto.createHmac('sha256', env.HMAC_KEY as string)
        .update(payload)
        .digest('hex');

    if (calculatedHmac !== hmac) {
        throw new Error('Invalid HMAC: Data may have been tampered with');
    }
    const iv = Buffer.from(payload.slice(0, 32), 'hex');
    const encryptedData = payload.slice(32);


    const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

export { encryption, decryption };
