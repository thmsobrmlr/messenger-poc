import dotenv from 'dotenv';

dotenv.config();

export const appPort = process.env.APP_PORT || 3000;
export const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
