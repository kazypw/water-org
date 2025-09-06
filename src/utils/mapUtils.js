import { LngLatBounds } from "maplibre-gl";

export const searchOrganizations = (data, query) => {
    if (!query || query.trim() === "") {
        return data;
    }

    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);

    return data.filter(item => {
        const searchableFields = [
            item['Organization name'],
            item.City,
            item.Country,
            item.Sector,
            item['Field of Focus'],
        ];

        const searchableText = searchableFields
        .filter(field => field != null)
        .map(field => String(field).toLowerCase())
        .join(' ');

        return searchTerms.every(term => 
        searchableText.includes(term)
        );
    });
};

export function fitToCoordinates(map, coordinates, options = {}) {
    if (!map || !coordinates || coordinates.length === 0) {
      console.warn("Map or coordinates missing");
      return;
    }
  
    const coordsArray = Array.isArray(coordinates[0]) 
      ? coordinates 
      : [coordinates];
  
    const bounds = new LngLatBounds();
  
    coordsArray.forEach(coord => bounds.extend(coord));
  
    map.fitBounds(bounds, {
      padding: 40,
      maxZoom: 14,
      duration: 2000,
      ...options
    });
  }