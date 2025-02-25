
const config = {
    //encryption key
    AES_KEY_HEX: process.env.AES_KEY_HEX,
    HMAC_KEY: process.env.HMAC_KEY,

    //redis
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASS: process.env.REDIS_PASS,


    //EmailJS
    EMAILJS_KEY: process.env.EMAILJS_KEY,
    EMAILJS_SERVICE: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_OTP: process.env.EMAILJS_TEMPLATE_OTP,
    EMAILJS_RESET: process.env.EMAILJS_TEMPLATE_RESET_PASSWORD,
}


export default config;