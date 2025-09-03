import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { useMapStore } from "../../store/useMapStore";
import { useDataStore } from "../../store/useDataStore";
import loadCSVData from "../../utils/loadCSVData";
import blanketData from '../../assets/blanket.json'

import 'maplibre-gl/dist/maplibre-gl.css';
import { useUIStore } from "../../store/useUIStore";

loadCSVData()

function MapContainer() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const setSidebarActive = useUIStore((s) => s.setSidebarActive);
  const orgData = useDataStore((s) => s.orgData);

  const center = useMapStore((s) => s.center);
  const zoom = useMapStore((s) => s.zoom);
  const setZoom = useMapStore((s) => s.setZoom);
  const searchOrg = useMapStore((s) => s.searchOrg);
  const itemCardCoordinates = useMapStore((s) => s.itemCardCoordinates);
  const setActiveMarkerInfo = useMapStore((s) => s.setActiveMarkerInfo)

  const searchOrganizations = (data, query) => {
    if (!query || query.trim() === "") {
      return data;
    }

    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    return data.filter(item => {
      const searchableFields = [
        item.Name,
        item.Organization,
        item.City,
        item.Region,
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

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center,
      zoom,
      renderWorldCopies: false,
      maxBounds: [
        [40, 39],   // southwest 
        [95, 57]    // northeast 
      ]
    });

    mapInstanceRef.current = map;

    map.on("zoom", () => setZoom(map.getZoom()));

    map.on('load', () => {
      map.addSource('blanket', {
        type: 'geojson',
        data: blanketData
      });

      map.addLayer({
        id: 'blanket-fill',
        type: 'fill',
        source: 'blanket',
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.85
        }
      });

      map.addLayer({
        id: 'blanket-outline',
        type: 'line',
        source: 'blanket',
        paint: {
          'line-color': '#000000',
          'line-width': 2
        }
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !orgData || !orgData.data) return;

    const map = mapInstanceRef.current;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filteredData = searchOrganizations(orgData.data, searchOrg);

    console.log(`Search: "${searchOrg}" returned ${filteredData.length} results out of ${orgData.data.length} total`);
    console.log(orgData)
    // Add markers for filtered data
    filteredData.forEach((item) => {
      if (item.Latitude && item.Longitude) {
        const lat = parseFloat(item.Latitude);
        const lng = parseFloat(item.Longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          // Create popup content with available information
          // const popupContent = `
          //   <div style="min-width: 200px; font-family: system-ui, -apple-system, sans-serif;">
          //     <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
          //       ${item.Name || item.Organization || 'Water Organization'}
          //     </h3>
          //     ${item.Type ? `<p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Type:</strong> ${item.Type}</p>` : ''}
          //     ${item.City ? `<p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Location:</strong> ${item.City}${item.Region ? `, ${item.Region}` : ''}</p>` : ''}
          //     ${item.Activities ? `<p style="margin: 4px 0; color: #6b7280; font-size: 12px;"><strong>Activities:</strong> ${item.Activities}</p>` : ''}
          //     ${item.Description ? `<p style="margin: 8px 0 0 0; color: #4b5563; font-size: 11px; font-style: italic;">${item.Description.length > 100 ? item.Description.substring(0, 100) + '...' : item.Description}</p>` : ''}
          //   </div>
          // `;

          // const popup = new maplibregl.Popup({
          //   closeButton: true,
          //   closeOnClick: true,
          //   maxWidth: '300px'
          // }).setHTML(popupContent);

          const markerElement = document.createElement('div');
          markerElement.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #3b82f6;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            cursor: pointer;
          `;

          markerElement.addEventListener('mouseenter', () => {
            markerElement.style.backgroundColor = '#1d4ed8';
          });

          markerElement.addEventListener('mouseleave', () => {
            markerElement.style.backgroundColor = '#3b82f6';
          });

          markerElement.addEventListener('click', () => {
            setSidebarActive('attribute');
            setActiveMarkerInfo(item)
          })

          const marker = new maplibregl.Marker({ 
            element: markerElement,
            anchor: 'center'
          })
            .setLngLat([lng, lat])
            // .setPopup(popup)
            .addTo(map);

          markersRef.current.push(marker);
        }
      }
    });

    // Auto-fit bounds if there are search results and markers
    if (searchOrg && filteredData.length > 0 && filteredData.length < orgData.data.length) {
      const bounds = new maplibregl.LngLatBounds();
      let hasValidBounds = false;

      filteredData.forEach((item) => {
        if (item.Latitude && item.Longitude) {
          const lat = parseFloat(item.Latitude);
          const lng = parseFloat(item.Longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            bounds.extend([lng, lat]);
            hasValidBounds = true;
          }
        }
      });

      if (hasValidBounds) {
        map.fitBounds(bounds, { 
          padding: 50,
          maxZoom: 10,
          duration: 1000
        });
      }
    }
  }, [orgData, searchOrg]);

  function fitToCoordinates(map, coordinates, options = {}) {
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
      duration: 2000,
      ...options
    });
  }

  useEffect(() => {
    fitToCoordinates(mapInstanceRef.current, itemCardCoordinates)
  }, [itemCardCoordinates])

  return <div ref={mapRef} className="w-full h-screen bg-black" />;
}

export default MapContainer