import React from 'react';
import { Slide } from '../types';
import CodeBlock from './CodeBlock';
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, Target, Clock } from 'lucide-react';

interface SlideContentProps {
  slide: Slide;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <p className="text-lg leading-relaxed text-slate-200">{content}</p>;
    }

    if (content.type === 'code') {
      return <CodeBlock code={content.code} language={content.language || 'java'} />;
    }

    if (content.type === 'list') {
      return (
        <ul className="space-y-3">
          {content.items.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-3 text-lg text-slate-200">
              <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (content.type === 'comparison') {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="text-red-400" size={20} />
              <h4 className="font-semibold text-red-300">{content.bad.title}</h4>
            </div>
            {content.bad.code && <CodeBlock code={content.bad.code} language="java" />}
            {content.bad.description && <p className="text-slate-300 mt-3">{content.bad.description}</p>}
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-400" size={20} />
              <h4 className="font-semibold text-green-300">{content.good.title}</h4>
            </div>
            {content.good.code && <CodeBlock code={content.good.code} language="java" />}
            {content.good.description && <p className="text-slate-300 mt-3">{content.good.description}</p>}
          </div>
        </div>
      );
    }

    if (content.type === 'benefit') {
      return (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-blue-400" size={20} />
            <span className="font-semibold text-blue-300">Benefit:</span>
            <span className="text-slate-200">{content.text}</span>
          </div>
        </div>
      );
    }

    if (content.type === 'warning') {
      return (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-400" size={20} />
            <span className="font-semibold text-yellow-300">Warning:</span>
            <span className="text-slate-200">{content.text}</span>
          </div>
        </div>
      );
    }

    if (content.type === 'tip') {
      return (
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-purple-400" size={20} />
            <span className="font-semibold text-purple-300">Tip:</span>
            <span className="text-slate-200">{content.text}</span>
          </div>
        </div>
      );
    }

    if (content.type === 'table') {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-600">
                {content.headers.map((header: string, index: number) => (
                  <th key={index} className="text-left p-3 font-semibold text-blue-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row: string[], index: number) => (
                <tr key={index} className="border-b border-slate-700/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-3 text-slate-200">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {slide.title}
          </h1>
          <div className="flex items-center gap-2 text-sm bg-slate-800/50 px-3 py-1 rounded-full">
            <Clock size={16} className="text-blue-400" />
            <span className="text-slate-300">{slide.duration}</span>
          </div>
        </div>
        {slide.subtitle && (
          <p className="text-xl text-slate-300 mb-6">{slide.subtitle}</p>
        )}
        {slide.objectives && (
          <div className="bg-slate-800/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-green-400" size={20} />
              <h3 className="text-lg font-semibold text-green-300">Learning Objectives</h3>
            </div>
            <ul className="space-y-2">
              {slide.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-200">
                  <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {slide.content.map((content, index) => (
          <div key={index}>
            {renderContent(content)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideContent;