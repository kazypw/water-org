import maplibregl from "maplibre-gl";

export default function fitToCoordinates(map, coordinates, options = {}) {
  if (!map || !coordinates || coordinates.length === 0) {
    console.warn("Map or coordinates missing");
    return;
  }

  const coordsArray = Array.isArray(coordinates[0]) 
    ? coordinates 
    : [coordinates];

  const bounds = new maplibregl.LngLatBounds();

  coordsArray.forEach(coord => bounds.extend(coord));

  map.fitBounds(bounds, {
    padding: 40,
    maxZoom: 14,
    duration: 1000,
    ...options
  });
}
