# React AI Chatbot

A modern, responsive AI chatbot application built with React and Vite. It supports multiple AI models, multiple simultaneous conversations, and provides a seamless chatting experience with a clean UI.

## Features

- **Multi-LLM Support**: Seamlessly switch between different AI assistants, including:
  - Google Gemini (Gemini 3 Flash Preview, Gemini 2.0 Flash-Lite)
  - OpenAI (GPT-4o mini, ChatGPT-4o)
  - Anthropic (Claude 3.5 Haiku)
  - DeepSeek AI (DeepSeek-V3)
  - xAI (Grok 3 Mini)
- **Multi-Chat Management**: Create and switch between multiple conversations via the sidebar.
- **New Chat**: Start fresh conversations with a single click; empty chats are automatically cleaned up when switching.
- **Real-time Streaming**: Enjoy fast, real-time responses as the AI generates them.
- **Chat History**: Each conversation's title is automatically generated from its first message.
- **Auto-Scrolling Chat**: Automatically scrolls to the latest message.
- **Message Grouping**: Intelligently groups messages for better readability.
- **Markdown Support**: Rich text rendering for assistant replies (code blocks, lists, etc.).
- **Theme Switcher**: Supports Light, Dark, and System modes.
- **Responsive Design**: Mobile-friendly layout with a collapsible sidebar.

## Previews

Here is a glimpse of the application in action:

### Light Mode
![Light Mode](public/chat-ligth.png)

### Dark Mode
![Dark Mode](public/chat-dark.png)

## Getting Started

### Prerequisites

- Node.js (v20+)
- API Keys for the respective AI services you want to use.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/exhorte/react-chatbot.git
   cd react-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your API keys:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   VITE_GOGGLE_AI_API_KEY=your_google_api_key_here
   VITE_OPEN_AI_API_KEY=your_openai_api_key_here
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
   VITE_X_AI_API_KEY=your_xai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **Vanilla CSS** (`.module.css`) — Styling with CSS Modules
- **react-markdown v10** — Markdown rendering for assistant responses
- **uuid** — Unique ID generation for chat sessions
- **AI SDKs**:
  - `@google/genai` — Google Gemini
  - `openai` — OpenAI / ChatGPT
  - `@anthropic-ai/sdk` — Anthropic Claude
  - DeepSeek & xAI via OpenAI-compatible API

## Notes

- This app runs entirely in the **browser**. API keys are exposed to the client — for production use, proxy requests through a backend server.
- Google Gemini free tier has daily/per-minute quota limits. If you hit a `429` error, wait a minute or switch to another model.
