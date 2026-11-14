// Import Mapbox as an ESM module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';
// Import D3.js as an ESM module
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
// Check that Mapbox GL JS is loaded
console.log('Mapbox GL JS Loaded:', mapboxgl);

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiczZxaSIsImEiOiJjbXdibDJxZHkwMnMyMndwbmFqOXQ4eWJoIn0.MwbI1EL99R65QfEvJBcBrw';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // ID of the div where the map will render
  style: 'mapbox://styles/mapbox/streets-v12', // Map style
  center: [-71.09415, 42.36027], // [longitude, latitude]
  zoom: 12, // Initial zoom level
  minZoom: 5, // Minimum allowed zoom
  maxZoom: 18, // Maximum allowed zoom
});

// Add navigation controls to the map (zoom and rotation)
map.on('load', async () => {
    // code
    map.addSource('boston_route', {
    type: 'geojson',
    data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson',
    });


    // add a layer to visualize the bike network (Boston)
    map.addLayer({
        id: 'bike-lanes',
        type: 'line',
        source: 'boston_route',
        paint: {
            'line-color': '#32D400',  // A bright green using hex code
            'line-width': 5,          // Thicker lines
            'line-opacity': 0.6       // Slightly less transparent
            }
    });

    // Add a new source for Cambridge bike lanes
    map.addSource('cambridge_route', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson',
    });

    map.addLayer({
        id: 'cambridge-bike-lanes',
        type: 'line',
        source: 'cambridge_route',
        paint: {
            'line-color': '#3B82F6',
            'line-width': 5,
            'line-opacity': 0.6
            },
    });

    // Load JSON data from the provided URL
    let jsonData;

    try {
        const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';;

        // Await JSON fetch
        jsonData = await d3.json(jsonurl);

        console.log('Loaded JSON Data:', jsonData);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }

    // Extract the stations array from the loaded JSON data
    let stations = jsonData.data.stations;

    console.log('Stations Array:', stations);    

});


