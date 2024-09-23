import React, { useState, useEffect, useRef } from "react";
import ChatConfigModal from "./components/LLModal";
import { LLM_APIS } from "./utils/llms";
import Error from "./components/Error";
import Messages from "./components/Messages";
import InputBox from "./components/InputBox";
import { replacePromptValue } from "./utils/helper";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [config, setConfig] = useState(LLM_APIS["Llama3.1"]);
  const [error, setError] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { type: "user", content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    if(!config.url) {
      setError("Please enter correct Custom LLM config")
      return;
    }

    try {
      const response = await fetch(config.url, {
        method: "POST",
        headers: JSON.parse(config.headers),
        body: JSON.stringify(replacePromptValue(JSON.parse(config.body), inputMessage))
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setMessages([...newMessages, { type: "bot", content: data.response }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <Messages
        messages={messages}
        isTyping={isTyping}
        chatEndRef={chatEndRef}
      />
      <Error error={error} />
      <InputBox
        setIsConfigOpen={setIsConfigOpen}
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        handleSend={handleSend}
      />

      {isConfigOpen && (
        <ChatConfigModal
          config={config}
          setConfig={setConfig}
          setIsConfigOpen={setIsConfigOpen}
        />
      )}
    </div>
  );
};

export default ChatInterface;
