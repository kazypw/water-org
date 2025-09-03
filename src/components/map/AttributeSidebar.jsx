import { useState, useEffect } from "react";
import { useUIStore } from "../../store/useUIStore";
import { useMapStore } from "../../store/useMapStore";

const AttributeSidebar = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive)
  const activeMarkerInfo = useMapStore((s) => s.activeMarkerInfo)

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (sidebarActive === 'attribute') {
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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return timestamp;
    }
  };

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return 'N/A';
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

  const InfoSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200" 
          style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const InfoField = ({ label, value, isLink = false, linkType = 'url' }) => {
    if (!value) return null;

    const renderValue = () => {
      if (isLink && value !== 'N/A') {
        if (linkType === 'email') {
          return (
            <a 
              href={`mailto:${value}`}
              className="text-blue-500 hover:text-blue-600 underline break-all"
            >
              {value}
            </a>
          );
        } else if (linkType === 'phone') {
          return (
            <a 
              href={`tel:${value}`}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              {value}
            </a>
          );
        } else {
          return (
            <a 
              href={value.startsWith('http') ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline break-all"
            >
              {value}
            </a>
          );
        }
      }
      return <span className="break-words">{value}</span>;
    };

    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium opacity-70">{label}</span>
        <div style={{ color: 'var(--text-secondary)' }}>
          {renderValue()}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`fixed h-auto bg-black top-[70px] bottom-0 z-50 w-86 transform transition-all duration-500 ease-out overflow-y-auto ${
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

export default AttributeSidebar;