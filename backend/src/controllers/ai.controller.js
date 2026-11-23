import { generateAIResponse } from "../services/ai.services.js";

export const generateResponse = async (req, res) => {
  try {
    const { provider, prompt } = req.body;

    if (!provider || !prompt?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Provider and prompt are required",
      });
    }

    const result = await generateAIResponse(provider, prompt.trim());

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("OpenAI Error:", {
      status: error.status,
      code: error.code,
      type: error.type,
      message: error.message,
    });

    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};
