import { useDataStore } from "../../../store/useDataStore";
import { useUIStore } from "../../../store/useUIStore";
import { useMapStore } from '../../../store/useMapStore';
import { useListAnimation } from "../../../hooks/useListAnimation";
import ItemOrg from "./ItemOrg";
import ListAnimations from './ListAnimations'
import CloseButton from './CloseButton'

const ListItem = () => {
  const orgData = useDataStore((s) => s.orgData);
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setItemCardCoordinates = useMapStore((s) => s.setItemCardCoordinates)

  const { isVisible, isAnimatingOut } = useListAnimation(sidebarActive, 'list');

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
      <div className="flex gap-[2rem] flex-col">
        {orgData && orgData.data && (
          orgData.data.map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 ease-out"
              style={{
                animation: isAnimatingOut
                  ? `fadeOutDown 0.3s ease-in forwards ${index * 0.05}s`
                  : `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`,
                opacity: isAnimatingOut ? 1 : 0,
                transform: isAnimatingOut ? 'translateY(0)' : 'translateY(20px)'
              }}
              onClick={() => setItemCardCoordinates([item['Longitude'], item['Latitude']])}
            >
              <ItemOrg item={item} />
            </div>
          ))
        )}
      </div>
      <ListAnimations />
    </div>
  );
};

export default ListItem;