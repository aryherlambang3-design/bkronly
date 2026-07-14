"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    id: "expeditions",
    title: "1. Expeditions Logbook",
    description: "Browse through Fikri's collection of wildlife photography and documentary films captured across Indonesia's national parks.",
    targetSelector: "#portfolio",
    position: "top",
  },
  {
    id: "storyteller",
    title: "2. The Storyteller",
    description: "Learn about Fikri Muhammad's journey as a wildlife documentary filmmaker and his conservation mission.",
    targetSelector: "#about",
    position: "top",
  },
  {
    id: "profile-card",
    title: "3. Fikri Muhammad Profile",
    description: "Connect with Fikri on social media - TikTok and LinkedIn for behind-the-scenes content and professional updates.",
    targetSelector: "#about .lg\\:col-span-5",
    position: "left",
  },
  {
    id: "production-gear",
    title: "4. Production Gear",
    description: "Discover the professional cinema equipment used to capture stunning 8K wildlife footage in extreme conditions.",
    targetSelector: "#gear",
    position: "left",
  },
  {
    id: "cta-section",
    title: "5. Watch His Wildlife Documentaries",
    description: "Subscribe to Fikri's YouTube channel and follow on Instagram for high-quality wildlife documentaries and expedition updates.",
    targetSelector: "#about + section",
    position: "top",
  },
  {
    id: "contact",
    title: "6. Get In Touch",
    description: "Interested in collaboration or licensing footage? Send a message directly through the contact form.",
    targetSelector: "#contact",
    position: "top",
  },
];

export default function GuidedTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Listen for explore portfolio click - ALWAYS show tour (no localStorage check)
    const handleExploreClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      // Check if it's the Explore Portfolio button
      if (link && (
        link.getAttribute('href') === '#portfolio' ||
        link.textContent?.includes('Explore Portfolio')
      )) {
        e.preventDefault();
        startTour();
      }
    };

    document.addEventListener("click", handleExploreClick);
    return () => document.removeEventListener("click", handleExploreClick);
  }, []);

  useEffect(() => {
    if (isActive && tourSteps[currentStep]) {
      const targetElement = document.querySelector(
        tourSteps[currentStep].targetSelector
      ) as HTMLElement;
      
      if (targetElement) {
        setHighlightedElement(targetElement);
        
        // Scroll to element with offset
        const yOffset = -100;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });

        // Add highlight class
        targetElement.classList.add("tour-highlight");
      }
      
      // Hide header when tour is active
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    } else {
      // Show header when tour is not active
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'block';
      }
    }

    return () => {
      if (highlightedElement) {
        highlightedElement.classList.remove("tour-highlight");
      }
      // Restore header when component unmounts
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'block';
      }
    };
  }, [currentStep, isActive]);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      if (highlightedElement) {
        highlightedElement.classList.remove("tour-highlight");
      }
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      if (highlightedElement) {
        highlightedElement.classList.remove("tour-highlight");
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    // Show header before closing
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'block';
    }
    completeTour();
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const completeTour = () => {
    if (highlightedElement) {
      highlightedElement.classList.remove("tour-highlight");
    }
    setIsActive(false);
    // NO localStorage save - tour can be shown again
    
    // Show header again
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'block';
    }
    
    // Scroll to portfolio section
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isActive) return null;

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Very Light Overlay - Almost invisible, homepage stays clear */}
      <div className="fixed inset-0 bg-black/10 z-[999]" />

      {/* Tour Tooltip - Draggable & Responsive */}
      <div 
        className="fixed z-[1000] w-full px-4 sm:max-w-md"
        style={{
          left: position.x ? `${position.x}px` : '50%',
          top: position.y ? `${position.y}px` : '50%',
          transform: position.x || position.y ? 'none' : 'translate(-50%, -50%)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <div 
          className="bg-white/90 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress Bar */}
          <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 cursor-grab active:cursor-grabbing touch-none">
                <div className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="text-zinc-400 dark:text-zinc-500">☰</span>
                  Step {currentStep + 1} of {tourSteps.length}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
              <button
                onClick={skipTour}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors p-1"
                aria-label="Close tour"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed">
              {step.description}
            </p>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 pt-2">
              <button
                onClick={skipTour}
                className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors py-2 sm:py-0"
              >
                Skip Tour
              </button>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-all"
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    Back
                  </button>
                )}

                <button
                  onClick={nextStep}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-lg shadow-emerald-900/30"
                >
                  {currentStep < tourSteps.length - 1 ? (
                    <>
                      Next
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </>
                  ) : (
                    "Finish Tour"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Pointer (optional visual indicator) */}
        <div className="flex justify-center mt-4">
          <div className="animate-bounce text-emerald-500">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Global CSS for highlight effect with outline box */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 997 !important;
          outline: 4px solid #10b981 !important;
          outline-offset: 8px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.02);
          transition: all 0.3s ease;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75),
                      0 0 30px rgba(16, 185, 129, 0.6) !important;
        }
        
        /* Alternative: Double outline effect */
        .tour-highlight::before {
          content: '';
          position: absolute;
          inset: -12px;
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 16px;
          pointer-events: none;
        }
        
        /* Pulse animation for outline */
        @keyframes pulse-outline {
          0%, 100% {
            outline-color: #10b981;
          }
          50% {
            outline-color: #14f195;
          }
        }
        
        .tour-highlight {
          animation: pulse-outline 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
