
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

import { config } from '../config/env.js';

const openai = new OpenAI({
    apiKey: config.openai.apiKey
});

const gemini = new GoogleGenAI({
    apiKey: config.gemini.apiKey
});

export const generateAIResponse = async (provider, prompt) => {

    switch (provider.toLowerCase()) {

        case 'openai': {

            const response = await openai.responses.create({
                model: config.openai.model,
                input: prompt
            });

            return {
                provider: 'openai',
                model: config.openai.model,
                response: response.output_text
            };
        }

        case 'gemini': {

            const response = await gemini.models.generateContent({
                model: config.gemini.model,
                contents: prompt
            });

            return {
                provider: 'gemini',
                model: config.gemini.model,
                response: response.text
            };
        }

        default:
            throw new Error('Unsupported AI provider');
    }
};
