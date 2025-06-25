import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Clock, Target, BookOpen } from 'lucide-react';
import slides from './slides';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar';
import SlideContent from './components/SlideContent';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isTransitioning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      <ProgressBar current={currentSlide} total={slides.length} />
      
      <div className="flex-1 flex">
        <Navigation 
          slides={slides} 
          currentSlide={currentSlide} 
          onSlideSelect={goToSlide} 
        />
        
        <main className="flex-1 flex flex-col">
          <div className={`flex-1 transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <SlideContent slide={slides[currentSlide]} />
          </div>
          
          <div className="flex justify-between items-center p-6 border-t border-slate-700/50">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                90 min
              </div>
              <div className="flex items-center gap-1">
                <Target size={16} />
                {slides[currentSlide].duration}
              </div>
              <span>{currentSlide + 1} / {slides.length}</span>
            </div>
            
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;