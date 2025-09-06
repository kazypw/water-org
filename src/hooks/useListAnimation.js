import { useState, useEffect } from "react";

export const useListAnimation = (sidebarActive, componentType) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (sidebarActive === componentType) {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (isVisible) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [sidebarActive, isVisible, componentType]);

  return { isVisible, isAnimatingOut };
};