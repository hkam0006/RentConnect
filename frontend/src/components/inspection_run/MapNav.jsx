import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const ACCESS_TOKEN = "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";

const geocodingClient = mbxGeocoding({ accessToken: ACCESS_TOKEN });

const getCoordinates = async (address) => {
  try {
    const response = await geocodingClient.forwardGeocode({
      query: address,
      limit: 1
    }).send();

    if (response && response.body && response.body.features && response.body.features.length > 0) {
      const coordinates = response.body.features[0].geometry.coordinates;
      console.log('Coordinates:', coordinates);
      return coordinates;
    } else {
      console.error('Geocoding failed: No results found');
      return null;
    }
  } catch (error) {
    console.error('Geocoding failed:', error);
    return null;
  }
};

const MapComponent = ({ origin, destination }) => {
  const [coords, setCoords] = useState(null);
  const address = '4/28 Arnott street Clayton Melbourne';

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = await getCoordinates(address);
      if (coordinates) {
        setCoords(coordinates);
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    if (!coords) return; // Ensure coords is set before initializing the map

    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/mapbox/streets-v12",
      center: coords,
      zoom: 13,
      accessToken: ACCESS_TOKEN,
    });

    const directions = new MapboxDirections({
      accessToken: ACCESS_TOKEN,
      controls: {
        inputs: true,
        instructions: false, // Disable the default instructions panel
      }
    });

    map.addControl(directions, 'top-left');

    if (origin && destination) {
      directions.setOrigin(origin);
      directions.setDestination(destination);
      
      directions.addWaypoint(0, coords);
      new mapboxgl.Marker().setLngLat(coords).addTo(map)
    }

    // Add custom directions instructions
    directions.on('route', (e) => {
      if (e.route && e.route.length > 0) {
        const route = e.route[0];
        const instructionsContainer = document.getElementById('directions-instructions');
        instructionsContainer.innerHTML = ''; // Clear previous instructions

        if (route.legs && route.legs.length > 0) {
          route.legs[0].steps.forEach((step) => {
            const stepDiv = document.createElement('div');
            stepDiv.innerHTML = step.maneuver.instruction;
            instructionsContainer.appendChild(stepDiv);
          });
        } else {
          instructionsContainer.innerHTML = '<p>No route legs found.</p>';
        }
      } else {
        const instructionsContainer = document.getElementById('directions-instructions');
        instructionsContainer.innerHTML = '<p>No route found.</p>';
      }
    });

    directions.on('error', (e) => {
      const instructionsContainer = document.getElementById('directions-instructions');
      instructionsContainer.innerHTML = `<p>Directions error: ${e.error}</p>`;
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [coords, origin, destination]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div id="map" style={{ width: '60%', height: '400px' }} />
      <div id="directions-instructions" style={{ width: '40%', height: '400px', overflowY: 'auto', padding: '10px' }} />
    </div>
  );
};

export default MapComponent;
