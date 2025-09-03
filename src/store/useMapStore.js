import { create } from 'zustand';

export const useMapStore = create((set) => ({
    center: [67.709953, 48.019573],
    zoom: 4.5,
    searchOrg: null,
    activeMarkerInfo: {},
    isMarkerSidebarOpen: false,
    itemCardCoordinates: [],

    setItemCardCoordinates: (itemCardCoordinates) => set({ itemCardCoordinates }),
    setIsMarkerSidebarOpen: (isMarkerSidebarOpen) => set({ isMarkerSidebarOpen }),
    setActiveMarkerInfo: (activeMarkerInfo) => set({ activeMarkerInfo }),
    setSearchOrg: (searchOrg) => set({ searchOrg }),
    setCenter: (coordinates) => set({ coordinates }),
    setZoom: (zoom) => set({ zoom }),
}));
