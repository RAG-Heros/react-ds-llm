import React, { useState } from "react";
import { LLM_APIS } from "../utils/llms";

const ChatConfigModal = ({ config, setConfig, setIsConfigOpen }) => {
  console.log(config);

  const [selectedLLM, setSelectedLLM] = useState(config.name);

  const handleLLMChange = (llm) => {
    setSelectedLLM(llm);
    const llmConfig = LLM_APIS[llm];
    setConfig({
      name: llmConfig.name,
      url: llmConfig.url,
      headers: llmConfig.headers,
      body: llmConfig.body,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Chat Configuration</h2>
        <select
          value={selectedLLM}
          onChange={(e) => handleLLMChange(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          {Object.keys(LLM_APIS).map((llm) => (
            <option key={llm} value={llm}>
              {llm}
            </option>
          ))}
        </select>
        <input
          placeholder="API URL"
          value={config.url}
          onChange={(e) => setConfig({ ...config, url: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Headers (JSON)"
          value={config.headers}
          onChange={(e) => setConfig({ ...config, headers: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          rows={4}
        />
        <textarea
          placeholder="Body (JSON)"
          value={config.body}
          onChange={(e) => setConfig({ ...config, body: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          rows={4}
        />
        <button
          onClick={() => setIsConfigOpen(false)}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatConfigModal;
