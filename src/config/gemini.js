import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAwNQd3vnli2_UqRdyDPnD8Or-MXu4uM-M";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    if (result.response && result.response.text) {
      const responseText = await result.response.text();
      console.log(responseText);
      return responseText;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error running the model:", error);
    return null;
  }
}

export default run;
