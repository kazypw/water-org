import { create } from "zustand";

export const useUIStore = create((set) => ({
    sidebarActive: null,
    isMobileSidebarOn: false,

    setIsMobileSidebarOn: (isMobileSidebarOn) => set({ isMobileSidebarOn }),
    setSidebarActive: (sidebarActive) => set({ sidebarActive })
}))