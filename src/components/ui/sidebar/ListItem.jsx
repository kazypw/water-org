import { useDataStore } from "../../../store/useDataStore";
import { useUIStore } from "../../../store/useUIStore";
import { useMapStore } from '../../../store/useMapStore';
import { useListAnimation } from "../../../hooks/useListAnimation";
import { useState, useEffect } from 'react';
import ItemOrg from "./ItemOrg";
import ListAnimations from './ListAnimations'
import CloseButton from './CloseButton'
import useIsMobile from "../../../hooks/useIsMobile";

const DesktopMenu = () => {
  const orgData = useDataStore((s) => s.orgData);
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setItemCardCoordinates = useMapStore((s) => s.setItemCardCoordinates);

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

const MobileMenu = () => {
  const orgData = useDataStore((s) => s.orgData);
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setItemCardCoordinates = useMapStore((s) => s.setItemCardCoordinates);
  const setSidebarActive = useUIStore((s) => s.setSidebarActive);

  const { isVisible, isAnimatingOut } = useListAnimation(sidebarActive, 'list');

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${
          isAnimatingOut ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setSidebarActive(false)}
      />
      
      {/* Mobile Menu */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 w-full transform transition-all duration-500 ease-out overflow-hidden ${
          isAnimatingOut ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundColor: 'var(--bg-color)',
          height: 'calc(100vh - 50px)',
          top: '50px',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Handle bar for visual indication */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-400 rounded-full opacity-50"></div>
        </div>
        
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <CloseButton isAnimatingOut={isAnimatingOut} />
        </div>
        
        {/* Content */}
        <div 
          className="flex flex-col gap-4 px-4 pb-[4rem] overflow-y-auto"
          style={{ 
            height: 'calc(100% - 60px)',
            paddingTop: '2rem'
          }}
        >
          {orgData && orgData.data && (
            orgData.data.map((item, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 ease-out"
                style={{
                  animation: isAnimatingOut
                    ? `fadeOutDown 0.3s ease-in forwards ${index * 0.03}s`
                    : `fadeInUp 0.6s ease-out forwards ${index * 0.08}s`,
                  opacity: isAnimatingOut ? 1 : 0,
                  transform: isAnimatingOut ? 'translateY(0)' : 'translateY(30px)'
                }}
                onClick={() => {
                  setItemCardCoordinates([item['Longitude'], item['Latitude']]);
                  setSidebarActive(false); // Close menu on item selection
                }}
              >
                <ItemOrg item={item} />
              </div>
            ))
          )}
        </div>
        
        <ListAnimations />
      </div>
    </>
  );
};

const ListItem = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileMenu /> : <DesktopMenu />;
};

export default ListItem;