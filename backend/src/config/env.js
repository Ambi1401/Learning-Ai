// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// export default openai;

import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = [
    'OPENAI_API_KEY',
    'OPENAI_MODEL',
    'GEMINI_API_KEY',
    'GEMINI_MODEL'
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing environment variable: ${variable}`);
    }
}

export const config = {
    port: Number(process.env.PORT) || 3000,

    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL
    },

    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL
    }
};
