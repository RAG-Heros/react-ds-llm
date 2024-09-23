import context from "../components.json";

const PLACEHOLDR_STRING = "**react-ds-llm-prompt**";

export function replacePromptValue(input, inputMessage) {
  const targetValue = PLACEHOLDR_STRING;
  console.log(JSON.stringify(
    context
  ));
  
  const replacementValue = `Consider below json - react docgen components - as context ${JSON.stringify(
    context
  )}  
  
  Now, as a web developer use the above React components (not default web components) and answer the below question.
  
  ${inputMessage}`;

  if (typeof input === "string") {
    return input === targetValue ? replacementValue : input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => replacePromptValue(item, inputMessage));
  }

  if (typeof input === "object" && input !== null) {
    const newObject = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        newObject[key] = replacePromptValue(input[key], inputMessage);
      }
    }
    return newObject;
  }

  return input;
}
