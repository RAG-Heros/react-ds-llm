import React from "react";
import TypingAnimation from "./TypingAnimation";
import MarkdownRenderer from "./MarkdownRenderer";

const Messages = ({ messages, isTyping, chatEndRef }) => {
  return (
    <div className="flex-grow overflow-auto mb-4 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[100%] p-3 rounded-lg ${
              msg.type === "user" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <MarkdownRenderer content={msg.content} />
            {/* {msg.content} */}
          </div>
        </div>
      ))}
      {isTyping && <TypingAnimation />}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Messages;
