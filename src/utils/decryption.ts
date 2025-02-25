import config from '@/config/env';
import crypto from 'crypto';

const AES_KEY = Buffer.from(config.AES_KEY_HEX as string, 'hex');

const decryption = (payload: string, hmac: string) => {
    const calculatedHmac = crypto.createHmac('sha256', config.HMAC_KEY as string)
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

export default decryption;