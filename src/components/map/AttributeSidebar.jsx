import { useUIStore } from "../../store/useUIStore";
import { useMapStore } from "../../store/useMapStore";
import CloseButton from "../ui/sidebar/CloseButton";
import { useListAnimation } from "../../hooks/useListAnimation";
import InfoSection from "./attribute/InfoSection";
import InfoField from "./attribute/InfoField";
import ListAnimations from "../ui/sidebar/ListAnimations";
import { useState, useEffect } from 'react';
import useIsMobile from "../../hooks/useIsMobile";

const DesktopAttributeSidebar = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const activeMarkerInfo = useMapStore((s) => s.activeMarkerInfo);
  const { isVisible, isAnimatingOut } = useListAnimation(sidebarActive, 'attribute');

  if (!isVisible) return null;

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return 'N/A';
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

  return (
    <div 
      className={`fixed h-auto bg-black top-[70px] bottom-0 z-50 w-86 transform transition-all duration-500 ease-out overflow-y-auto ${
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
      {activeMarkerInfo ? (
        <div 
          className="space-y-6"
          style={{
            animation: isAnimatingOut
              ? 'fadeOutDown 0.3s ease-in forwards'
              : 'fadeInUp 0.6s ease-out forwards',
            opacity: isAnimatingOut ? 1 : 0,
            transform: isAnimatingOut ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          {/* Header with Logo and Name */}
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
            {activeMarkerInfo['Logo url'] && (
              <img 
                src={activeMarkerInfo['Logo url']} 
                alt="Organization Logo"
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {activeMarkerInfo['Organization name'] || 'Organization'}
              </h2>
              {activeMarkerInfo['Sector'] && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: 'var(--accent-color)', 
                    color: 'var(--bg-color)' 
                  }}
                >
                  {activeMarkerInfo['Sector']}
                </span>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <InfoSection title="Overview">
            <InfoField 
              label="Field of Focus" 
              value={activeMarkerInfo['Field of Focus']} 
            />
            <InfoField 
              label="Short Description" 
              value={activeMarkerInfo['Short description']} 
            />
            <InfoField 
              label="Long Description" 
              value={activeMarkerInfo['Long description']} 
            />
          </InfoSection>

          {/* Contact Information */}
          <InfoSection title="Contact">
            <InfoField 
              label="Website" 
              value={activeMarkerInfo['Website']} 
              isLink={true}
            />
            <InfoField 
              label="Email" 
              value={activeMarkerInfo['Email']} 
              isLink={true}
              linkType="email"
            />
            <InfoField 
              label="Email Address" 
              value={activeMarkerInfo['Email Address']} 
              isLink={true}
              linkType="email"
            />
            <InfoField 
              label="Phone Number" 
              value={activeMarkerInfo['Phone number']} 
              isLink={true}
              linkType="phone"
            />
          </InfoSection>

          {/* Location Information */}
          <InfoSection title="Location">
            <InfoField 
              label="City" 
              value={activeMarkerInfo['City']} 
            />
            <InfoField 
              label="Country" 
              value={activeMarkerInfo['Country']} 
            />
            <InfoField 
              label="Coordinates" 
              value={formatCoordinates(
                activeMarkerInfo['Latitude'], 
                activeMarkerInfo['Longitude']
              )} 
            />
          </InfoSection>

        </div>
      ) : (
        <div 
          className="flex items-center justify-center h-full text-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div>
            <div className="text-4xl mb-4 opacity-50">📍</div>
            <p className="text-lg">Select a marker on the map</p>
            <p className="text-sm opacity-70 mt-2">Click on any marker to view detailed information</p>
          </div>
        </div>
      )}
       <ListAnimations />
    </div>
  );
};

const MobileAttributeSidebar = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setSidebarActive = useUIStore((s) => s.setSidebarActive);
  const activeMarkerInfo = useMapStore((s) => s.activeMarkerInfo);
  const { isVisible, isAnimatingOut } = useListAnimation(sidebarActive, 'attribute');

  if (!isVisible) return null;

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return 'N/A';
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${
          isAnimatingOut ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setSidebarActive(false)}
      />
      
      {/* Mobile AttributeSidebar */}
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
          className="px-4 pb-6 overflow-y-auto"
          style={{ 
            height: 'calc(100% - 60px)',
            paddingTop: '2rem'
          }}
        >
          {activeMarkerInfo ? (
            <div 
              className="space-y-6"
              style={{
                animation: isAnimatingOut
                  ? 'fadeOutDown 0.3s ease-in forwards'
                  : 'fadeInUp 0.6s ease-out forwards',
                opacity: isAnimatingOut ? 1 : 0,
                transform: isAnimatingOut ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              {/* Header with Logo and Name - Mobile Optimized */}
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                {activeMarkerInfo['Logo url'] && (
                  <img 
                    src={activeMarkerInfo['Logo url']} 
                    alt="Organization Logo"
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {activeMarkerInfo['Organization name'] || 'Organization'}
                  </h2>
                  {activeMarkerInfo['Sector'] && (
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: 'var(--accent-color)', 
                        color: 'var(--bg-color)' 
                      }}
                    >
                      {activeMarkerInfo['Sector']}
                    </span>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <InfoSection title="Overview">
                <InfoField 
                  label="Field of Focus" 
                  value={activeMarkerInfo['Field of Focus']} 
                />
                <InfoField 
                  label="Short Description" 
                  value={activeMarkerInfo['Short description']} 
                />
                <InfoField 
                  label="Long Description" 
                  value={activeMarkerInfo['Long description']} 
                />
              </InfoSection>

              {/* Contact Information */}
              <InfoSection title="Contact">
                <InfoField 
                  label="Website" 
                  value={activeMarkerInfo['Website']} 
                  isLink={true}
                />
                <InfoField 
                  label="Email" 
                  value={activeMarkerInfo['Email']} 
                  isLink={true}
                  linkType="email"
                />
                <InfoField 
                  label="Email Address" 
                  value={activeMarkerInfo['Email Address']} 
                  isLink={true}
                  linkType="email"
                />
                <InfoField 
                  label="Phone Number" 
                  value={activeMarkerInfo['Phone number']} 
                  isLink={true}
                  linkType="phone"
                />
              </InfoSection>

              {/* Location Information */}
              <InfoSection title="Location">
                <InfoField 
                  label="City" 
                  value={activeMarkerInfo['City']} 
                />
                <InfoField 
                  label="Country" 
                  value={activeMarkerInfo['Country']} 
                />
                <InfoField 
                  label="Coordinates" 
                  value={formatCoordinates(
                    activeMarkerInfo['Latitude'], 
                    activeMarkerInfo['Longitude']
                  )} 
                />
              </InfoSection>

            </div>
          ) : (
            <div 
              className="flex items-center justify-center h-full text-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              <div>
                <div className="text-3xl mb-4 opacity-50">📍</div>
                <p className="text-base">Select a marker on the map</p>
                <p className="text-sm opacity-70 mt-2">Tap on any marker to view detailed information</p>
              </div>
            </div>
          )}
        </div>
        
        <ListAnimations />
      </div>
    </>
  );
};



const AttributeSidebar = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileAttributeSidebar /> : <DesktopAttributeSidebar />;
};

export default AttributeSidebar;