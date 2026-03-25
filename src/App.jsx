import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

const client = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOGGLE_AI_API_KEY,
});

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    if (!import.meta.env.VITE_GOGGLE_AI_API_KEY) {
      addMessage({ content: "API Key is missing. Please check your .env.local file.", role: "system" });
      return;
    }

    addMessage({ content, role: "user" });
    try {
      console.log("Requesting Gemini (gemini-3-flash-preview)...");
      const response = await client.models.generateContent({
        model: "gemini-3-flash-preview", 
        contents: content,
      });
      
      console.log("Gemini Response:", response);
      if (response && response.text) {
        addMessage({ content: response.text, role: "assistant" });
      } else {
        // Fallback for different response structures
        const fallbackText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (fallbackText) {
          addMessage({ content: fallbackText, role: "assistant" });
        } else {
          throw new Error("Empty response from AI");
        }
      }
    } catch (error) {
      console.error("Gemini Error Detail:", error);
      // Try a fallback to a known model if gemini-3 fails
      try {
        console.log("Fallback to gemini-1.5-flash...");
        const retryResponse = await client.models.generateContent({
          model: "gemini-1.5-flash",
          contents: content,
        });
        addMessage({ content: retryResponse.text, role: "assistant" });
      } catch (retryError) {
        console.error("Retry Error:", retryError);
        addMessage({
          content: `Error: ${error.message || "Unknown error"}. Please check your API key and model access.`,
          role: "system",
        });
      }
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
