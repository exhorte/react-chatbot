import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOGGLE_AI_API_KEY,
});

export class Assistant {
  #model;
  #history;

  constructor(model = "gemini-3-flash-preview") {
    this.#model = model;
    this.#history = []; // Maintaining local history to prevent loss
  }

  async chat(content) {
    try {
      // Logic for multi-turn chat using the @google/genai unified client
      this.#history.push({ role: "user", parts: [{ text: content }] });
      
      const response = await ai.models.generateContent({
        model: this.#model,
        contents: this.#history,
      });

      const responseText = response.text;
      
      // Update history with assistant's response
      this.#history.push({ role: "model", parts: [{ text: responseText }] });
      
      return responseText;
    } catch (error) {
      console.error("Gemini Assistant Error:", error);
      throw error;
    }
  }
}
