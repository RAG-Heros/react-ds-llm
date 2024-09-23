import React from "react";

const TypingAnimation = () => (
  <div className="flex justify-start">
    <div className="bg-gray-100 p-3 rounded-lg">
      <div className="typing-loader w-12 h-6 flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

export default TypingAnimation;
