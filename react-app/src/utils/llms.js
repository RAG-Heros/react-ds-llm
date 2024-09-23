export const LLM_APIS = {
//   ChatGPT: {
//     name: "ChatGPT",
//     url: "https://api.openai.com/v1/chat/completions",
//     headers: JSON.stringify({
//       Authorization: "Bearer YOUR_OPENAI_API_KEY",
//       "Content-Type": "application/json",
//     }),
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a UI React developer. You will follow a react design system in context and build code for an UI",
//         },
//         {
//           role: "user",
//           content: "**react-ds-llm-prompt**",
//         },
//       ],
//     }),
//   },
  "Llama3.1": {
    name: "Llama3.1",
    url: "http://localhost:11434/api/generate",
    headers: JSON.stringify({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      prompt: "**react-ds-llm-prompt**",
      model: "llama3.1",
      stream: false,
    }),
  },
//   Custom: {
//     name: "Custom",
//     url: "",
//     headers: JSON.stringify({}),
//     body: JSON.stringify({
//       prompt: "**react-ds-llm-prompt**",
//     }),
//   },
};
