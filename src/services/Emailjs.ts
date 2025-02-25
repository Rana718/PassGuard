import config from "@/config/env";
import emailjs from "@emailjs/browser";

interface SendOtpProps {
    username: string;
    otp: string;
    email: string;
    type: "new_users" | "reset_password";
}

class EmailjsMessage {
    static sendOtp = (
        props: SendOtpProps
    ): Promise<{ message: string; status: boolean }> => {

        const templateId =
            props.type === "reset_password"
                ? (config.EMAILJS_RESET as string)
                : (config.EMAILJS_OTP as string);

        return emailjs
            .send(
                config.EMAILJS_SERVICE as string,
                templateId,
                {
                    from_name: "PassGuard Team",
                    username: props.username,
                    otp: props.otp,
                    from_email: config.EMAIL,
                    to_email: props.email,
                },
                config.EMAILJS_KEY as string
            )
            .then(() => {
                return { message: "Successful", status: true };
            })
            .catch((error) => {
                console.error("Failed to send OTP:", error);
                return { message: error.toString(), status: false };
            });
    };
}

export default EmailjsMessage;
