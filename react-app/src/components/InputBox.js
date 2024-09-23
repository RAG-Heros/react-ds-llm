import { Send, Settings } from "lucide-react";
import React from "react";

const InputBox = ({
  setIsConfigOpen,
  setInputMessage,
  inputMessage,
  handleSend,
}) => {
  return (
    <div className="flex space-x-2">
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded"
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Send className="w-4 h-4 mr-2 inline-block" />
        Send
      </button>
      <button
        onClick={() => setIsConfigOpen(true)}
        className="p-2 border rounded hover:bg-gray-100"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InputBox;
