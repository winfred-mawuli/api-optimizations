import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-json.js';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="relative group">
      <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-sm text-slate-400 capitalize">{language}</span>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className={`language-${language} text-sm leading-relaxed`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;