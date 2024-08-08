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
      accessToken: ACCESS_TOKEN
    });

    map.addControl(directions, 'top-left');

    if (origin) {
      directions.setOrigin(origin);
    }

    if (destination) {
      directions.setDestination(destination);
    }

    // Cleanup on unmount
    return () => map.remove();
  }, [origin, destination]);

  return <div id="map" style={{ width: 600, height: 400 }} />;
};

export default MapComponent;
