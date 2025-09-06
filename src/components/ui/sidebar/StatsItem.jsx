import { useListAnimation } from "../../../hooks/useListAnimation";
import { useUIStore } from "../../../store/useUIStore";
import ListAnimations from './ListAnimations'
import CloseButton from './CloseButton'

const StatsItem = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const { isVisible, isAnimatingOut } = useListAnimation(sidebarActive, 'stats');

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed h-auto bg-black top-[70px] bottom-0 z-50 w-86 transform transition-all duration-500 ease-out ${
        isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in'
      }`}
      style={{
        backgroundColor: 'var(--bg-color)',
        padding: '3rem 1rem',
        animation: isAnimatingOut 
          ? 'slideOut 0.4s ease-in forwards' 
          : 'slideIn 0.5s ease-out forwards'
      }}
    >
      <CloseButton isAnimatingOut={isAnimatingOut} />
      StatsItem

      <ListAnimations />
    </div>
  );
};

export default StatsItem;