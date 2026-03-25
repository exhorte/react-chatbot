import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

// Configure accurately as per snippet
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOGGLE_AI_API_KEY,
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "How does AI work?",
    });
    console.log(response.text);
  } catch (err) {
    console.error("Main function error:", err);
  }
}

// Initial test run as requested
main();

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: content,
      });
      addMessage({ content: response.text, role: "assistant" });
    } catch (error) {
      console.error("API Error:", error);
      addMessage({
        content: "Sorry, I couldn't process your request. Check console for details.",
        role: "system",
      });
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
