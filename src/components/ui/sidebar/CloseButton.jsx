import { useUIStore } from "../../../store/useUIStore";

const CloseButton = ({ isAnimatingOut }) => {
  const setSidebarActive = useUIStore((s) => s.setSidebarActive);

  const handleClose = () => {
    setSidebarActive(null);
  };

  return (
      <button
        className="absolute top-4 right-4 w-8 h-8 flex items-center 
          justify-center rounded-full backdrop-blur-sm group z-10"
      >
        <svg 
          onClick={handleClose}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="black" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-black/70 hover:cursor-pointer group-hover:text-black 
            transition-colors duration-200 transform hover:rotate-90 
            transition-transform"
          style={{
            animation: isAnimatingOut
              ? 'fadeOut 0.2s ease-in forwards'
              : 'fadeIn 0.6s ease-out forwards 0.3s',
            opacity: isAnimatingOut ? 1 : 0
          }}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
  );
};

export default CloseButton;