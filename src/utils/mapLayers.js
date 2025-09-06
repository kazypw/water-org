import blanketData from '../assets/blanket.json'

const MAIN_COLOR = '#000000'

export const creatingBlanketLayer = (map) => {
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
                'fill-color': MAIN_COLOR,
                'fill-opacity': 0.85
            }
        });

        map.addLayer({
            id: 'blanket-outline',
            type: 'line',
            source: 'blanket',
            paint: {
                'line-color': MAIN_COLOR,
                'line-width': 2
            }
        });
    });
}