import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const googleai = new GoogleGenerativeAI(apiKey);
const model = googleai.getGenerativeModel({ model: "gemini-2.5-flash" });
const chat = model.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    if (!apiKey) {
      addMessage({ content: "API Key is missing. Please check your .env.local file.", role: "system" });
      return;
    }

    addMessage({ content, role: "user" });
    try {
      const result = await chat.sendMessage(content);
      const responseText = result.response.text();
      addMessage({ content: responseText, role: "assistant" });
    } catch (error) {
      console.error("Chat Error:", error);
      addMessage({
        content: "Sorry, I could not process your request. Please try again.",
        role: "system"
      });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="Bot Logo" />
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
