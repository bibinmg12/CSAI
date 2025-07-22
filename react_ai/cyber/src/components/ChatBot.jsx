import React, { useState } from 'react';
import axios from 'axios';
import { createChatBotMessage } from 'react-chatbot-kit';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './ChatbotComponent.css'; // Ensure you have this file for the styles

const config = {
  initialMessages: [
    createChatBotMessage("Hello! I'm AI Assistant. How can I help you today?"),
  ],
  botName: 'AI Assistant',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#0d6efd',
      borderRadius: '10px',
      padding: '10px',
      maxWidth: '400px'
    },
    chatButton: {
      backgroundColor: '#0d6efd',
      borderRadius: '50%',
      height: '50px',
      width: '50px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    userMessageBox: {
      backgroundColor: '#f1f1f1',
      borderRadius: '10px',
      padding: '10px',
      maxWidth: '400px'
    },
    header: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      textAlign: 'center',
      padding: '10px',
      fontSize: '16px'
    },
  },
};

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleApiQuery(message);
  };
  return React.cloneElement(children, { parse });
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [loading, setLoading] = useState(false);

  const addMessage = (msg) => {
    const newMessage = createChatBotMessage(msg);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const actions = {
    handleApiQuery: async (message) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8001/api/query/', { query: message });
        const botResponse = response.data.answer || "I couldn't find an answer for that.";
        addMessage(botResponse);
      } catch (error) {
        console.error("Error calling the backend:", error);
        addMessage("Sorry, I encountered an error while processing your request.");
      } finally {
        setLoading(false);
      }
    },
    handleUnknown: () => addMessage("Sorry, I didn't understand that. Please try again."),
  };

  return React.cloneElement(children, { actions, loading });
};

const ChatBotComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="chatbot-container-wrapper">
      {!isVisible ? (
        <button
          className="chatbot-launch-button"
          onClick={() => setIsVisible(true)}
          aria-label="Open Chatbot"
        >
          {/* Inline bot icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="28"
            height="28"
            fill="#ffffff"
          >
            <path d="M32 2C28.686 2 26 4.686 26 8v2H22a6 6 0 0 0-6 6v6H8v8h8v12c0 4.418 3.582 8 8 8h16c4.418 0 8-3.582 8-8V30h8v-8h-8v-6a6 6 0 0 0-6-6h-4V8c0-3.314-2.686-6-6-6zm-8 24a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm16 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
          </svg>
        </button>
      ) : (
        <div className="chatbot-container">
          <div className="header">
            AI Assistant
            <button
              className="close-button"
              onClick={() => setIsVisible(false)}
              aria-label="Close Chatbot"
            >
              ✖
            </button>
          </div>
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )}
    </div>
  );
};

export default ChatBotComponent;
