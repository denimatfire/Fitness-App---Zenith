
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("ZenithFit AI Coach is disabled: API_KEY environment variable not set. Please set it in your deployment environment.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

let chat: Chat | null = null;

export const isAiEnabled = (): boolean => {
  return ai !== null;
};

export const startChat = () => {
  if (!ai) {
    chat = null;
    return;
  }
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Zenith, a friendly and encouraging AI wellness coach for the ZenithFit app. Your goal is to provide helpful, safe, and motivating advice on fitness, nutrition, and mental wellness. 
      - Always prioritize user safety. Advise users to consult with a healthcare professional before starting any new diet or exercise program.
      - Keep your responses concise, positive, and easy to understand.
      - Use emojis to make the conversation more engaging.
      - Do not provide medical diagnoses or treatment plans.
      - If asked about something outside of fitness, nutrition, or mental wellness, gently steer the conversation back to those topics.
      - Start your first message with a warm welcome like 'Hi! I'm Zenith, your AI wellness coach. How can I help you on your journey today? 💪'`,
    },
  });
};

export const sendMessageStream = async (message: string): Promise<AsyncGenerator<GenerateContentResponse> | null> => {
  if (!chat) {
    startChat();
  }

  if (!chat) {
    return null;
  }
  
  const result = await chat.sendMessageStream({ message });
  return result;
};
