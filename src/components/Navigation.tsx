import React, { useState } from 'react';
import { Menu, X, Clock } from 'lucide-react';
import { Slide } from '../types';

interface NavigationProps {
  slides: Slide[];
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ slides, currentSlide, onSlideSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-800/90 hover:bg-slate-700/90 rounded-lg backdrop-blur-sm transition-all duration-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed left-0 top-0 h-full w-80 bg-slate-800/95 backdrop-blur-md transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-16">
          <h2 className="text-lg font-bold mb-4 text-blue-300">Course Navigation</h2>
          <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => {
                  onSlideSelect(index);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-700/50 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{slide.title}</span>
                  <div className="flex items-center gap-1 text-xs opacity-70">
                    <Clock size={12} />
                    {slide.duration}
                  </div>
                </div>
                {slide.subtitle && (
                  <div className="text-xs opacity-70 mt-1">{slide.subtitle}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;