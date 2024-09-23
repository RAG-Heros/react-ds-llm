import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';

const CopyButton = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      // You might want to show a tooltip or some indication that the text was copied
      console.log('Text copied to clipboard');
    });
  };

  return (
    <button 
      onClick={handleCopy} 
      variant="outline" 
      size="icon" 
      className="absolute top-2 right-2"
    >
      <Copy className="h-4 w-4" />
    </button>
  );
};

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  
  return !inline ? (
    <div className="relative">
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyButton text={String(children)} />
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
      }}
      className="prose dark:prose-invert max-w-none"
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;