import axios from "axios";
import { handleNotify } from "../utils/handleNotify";
export interface SendEmailType {
    name: string;
    email: string;
    website?: string;
    message: string;
}
export const sendEmail = async (formValue: SendEmailType) => {
    const serviceId = 'service_gvrxoew';
    const templateId = 'template_efserq9';
    const publicKey = 'gA4Svf4h68cmJm2L1';
    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
            from_name: formValue.name,
            from_email: formValue.email,
            to_name: 'EduMaster',
            message: formValue.message,
        }
    };
    try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
        handleNotify("Successfully !", "")
    } catch (error) {
        console.log(error);
    }
}