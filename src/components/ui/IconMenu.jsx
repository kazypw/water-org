import { ChartArea, List, Filter, BadgePlus } from "lucide-react";
import { useUIStore } from "../../store/useUIStore";

const ICON_SIZE = 28;
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

  const getIconClasses = (isActive) =>
    `cursor-pointer transition-transform duration-500 hover:scale-110 ${
      isActive ? "opacity-100" : "opacity-20 hover:opacity-90"
    }`;
  
  const iconClassLast =
    "cursor-pointer transition-transform duration-500 hover:scale-110 hover:opacity-90 mt-7";

  return (
    <div
      className="fixed right-0 h-full z-50"
      style={{
        width: "3%",
        backgroundColor: "var(--bg-color)",
      }}
    >
      <div className="h-full gap-10 flex flex-col items-center justify-center">
        <ChartArea
          onClick={() => handleToggle("stats")}
          size={ICON_SIZE}
          color={sidebarActive === "stats" ? ACTIVE_COLOR : ICON_COLOR}
          className={getIconClasses(sidebarActive === "stats")}
        />
        <List
          onClick={() => handleToggle("list")}
          size={ICON_SIZE}
          color={sidebarActive === "list" ? ACTIVE_COLOR : ICON_COLOR}
          className={getIconClasses(sidebarActive === "list")}
        />
        <Filter
          onClick={() => handleToggle("filter")}
          size={ICON_SIZE}
          color={sidebarActive === "filter" ? ACTIVE_COLOR : ICON_COLOR}
          className={getIconClasses(sidebarActive === "filter")}
        />
        <BadgePlus
          onClick={() => window.open(FORM_URL, "_blank")}
          size={ICON_SIZE}
          color={ACTIVE_COLOR}
          className={iconClassLast}
        />
      </div>
    </div>
  );
};

export default IconMenu;