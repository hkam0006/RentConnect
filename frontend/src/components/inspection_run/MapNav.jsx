import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const ACCESS_TOKEN = "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ"

const MapComponent = ({ origin, destination }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: ACCESS_TOKEN,
      container: 'map',
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    const directions = new MapboxDirections({
      accessToken: ACCESS_TOKEN,
      controls: {
        inputs: true,
        instructions: false, // Disable the default instructions panel
      }
    });

    map.addControl(directions, 'top-left');

    if (origin) {
      directions.setOrigin(origin);
    }

    if (destination) {
      directions.setDestination(destination);
    }

    // Add custom directions instructions
    directions.on('route', (e) => {
      const route = e.route[0];
      const instructionsContainer = document.getElementById('directions-instructions');
      instructionsContainer.innerHTML = ''; // Clear previous instructions

      route.legs[0].steps.forEach((step) => {
        const stepDiv = document.createElement('div');
        stepDiv.innerHTML = step.maneuver.instruction;
        instructionsContainer.appendChild(stepDiv);
      });
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [origin, destination]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column' }}>
      <div id="map" style={{ width: '60%', height: '400px'}} />
      <div id="directions-instructions" style={{ width: '40%', height: '400px', overflowY: 'auto', padding: '10px' }} />
    </div>
  );
};

export default MapComponent;
