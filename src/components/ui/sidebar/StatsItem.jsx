import { useState, useEffect } from "react";
import { useUIStore } from "../../../store/useUIStore";

const StatsItem = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive);

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (sidebarActive === 'stats') {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (isVisible) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 400); // Match exit animation duration
      
      return () => clearTimeout(timer);
    }
  }, [sidebarActive, isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed h-auto bg-black top-[70px] bottom-0 z-50 w-86 transform transition-all duration-500 ease-out ${
        isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in'
      }`}
      style={{
        backgroundColor: 'var(--bg-color)',
        padding: '2rem 1rem',
        animation: isAnimatingOut 
          ? 'slideOut 0.4s ease-in forwards' 
          : 'slideIn 0.5s ease-out forwards'
      }}
    >
      StatsItem

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default StatsItem;