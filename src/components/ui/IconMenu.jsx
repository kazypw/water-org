import { useUIStore } from "../../store/useUIStore";
import { BarChart3, List, Filter, Plus, Search } from "lucide-react";
import SearchBar from "./SearchBar";

const ICON_SIZE_DESKTOP = 28;
const ICON_SIZE_MOBILE = 24;
const ICON_COLOR = "#0A1B3B";
const ACTIVE_COLOR = "#0076C0";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpyGaoKcsVNn3UDWCAITrslXpxrI3fJFHkpnSR8ykUBT_KOw/viewform?pli=1";

const IconMenu = () => {
  const sidebarActive = useUIStore((s) => s.sidebarActive);
  const setSidebarActive = useUIStore((s) => s.setSidebarActive);

  const handleToggle = (value) => {
    setSidebarActive(sidebarActive === value ? null : value);
  };

  const menuItems = [
    {
      id: "stats",
      icon: BarChart3,
      label: "Stats",
      isToggle: true
    },
    {
      id: "list",
      icon: List,
      label: "List",
      isToggle: true
    },
    {
      id: "add",
      icon: Plus,
      label: "Add",
      isToggle: false,
      action: () => window.open(FORM_URL, "_blank")
    },
    {
      id: "filter",
      icon: Filter,
      label: "Filter",
      isToggle: true
    },
    {
      id: 'search',
      icon: Search,
      label: 'Search',
      isToggle: true,
      action: () => {}
    }
  ];

  // Desktop version
  const DesktopMenu = () => {
    const getIconClasses = (isActive) =>
      `hover:cursor-pointer transition-transform duration-500 hover:scale-110 ${
        isActive ? "opacity-100" : "opacity-20 hover:opacity-90"
      }`;
    
    const iconClassLast =
      "hover:cursor-pointer transition-transform duration-500 hover:scale-110 hover:opacity-90 mt-7";

    return (
      <div
        className="fixed right-0 top-0 h-full z-40 w-12"
        style={{
          backgroundColor: "var(--bg-color)",
        }}
      >
        <div className="h-full gap-10 flex flex-col items-center justify-center px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = sidebarActive === item.id;
            const isLast = index === menuItems.length - 1;
            if (item.id === 'search') return;

            return (
              <Icon
                key={item.id}
                onClick={() => item.isToggle ? handleToggle(item.id) : item.action()}
                size={ICON_SIZE_DESKTOP}
                color={isActive || !item.isToggle ? ACTIVE_COLOR : ICON_COLOR}
                className={isLast ? iconClassLast : getIconClasses(isActive)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  // Mobile menu
  const MobileMenu = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Search Bar on top of the menu */}
        {!sidebarActive && (
          <div className="bg-[#F0F0FA] rounded-t-[1.4rem] border-t border-gray-200 px-4 py-3 flex justify-center">
            <SearchBar />
          </div>
        )}
        
        {/* Bottom menu icons */}
        <div className="bg-[#F1F6FF] border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center py-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = sidebarActive === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => item.isToggle ? handleToggle(item.id) : item.action()}
                  className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-200 hover:bg-gray-50 rounded-lg"
                >
                  <Icon
                    size={ICON_SIZE_MOBILE}
                    color={isActive || !item.isToggle ? ACTIVE_COLOR : ICON_COLOR}
                    className={`transition-all duration-200 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                  <span
                    className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                      isActive || !item.isToggle
                        ? "text-[#0076C0]"
                        : "text-[#0A1B3B] opacity-70"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop version - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <DesktopMenu />
      </div>
      
      {/* Mobile/Tablet version - hidden on desktop */}
      <div className="block lg:hidden">
        <MobileMenu />
      </div>
    </>
  );
};

export default IconMenu;