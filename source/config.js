import dotenv from 'dotenv';

dotenv.config();

export const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
export const verificationToken = process.env.FB_WEBHOOK_VERIFICATION_TOKEN;
