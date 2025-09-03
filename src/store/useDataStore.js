import { create } from "zustand";

export const useDataStore = create((set) => ({
    orgData: null,

    setOrgData: (orgData) => set({ orgData }),
}))