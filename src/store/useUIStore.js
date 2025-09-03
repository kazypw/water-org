import { create } from "zustand";

export const useUIStore = create((set) => ({
    sidebarActive: null,
    setSidebarActive: (sidebarActive) => set({ sidebarActive })
}))