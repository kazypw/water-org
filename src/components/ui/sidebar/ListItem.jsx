import { useState, useEffect } from "react";
import { useDataStore } from "../../../store/useDataStore";
import { useUIStore } from "../../../store/useUIStore";
import { useMapStore } from '../../../store/useMapStore';
import ItemOrg from "./ItemOrg";

const ListItem = () => {
  const orgData = useDataStore((s) => s.orgData);
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setItemCardCoordinates = useMapStore((s) => s.setItemCardCoordinates)

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (sidebarActive === 'list') {
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

export default ListItem;