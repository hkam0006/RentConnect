import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

const ACCESS_TOKEN =
    "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";

const PropertyMap = ({point}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
  
    useEffect(() => {
      if (map.current) return; // initialize map only once
  
      map.current = new mapboxgl.Map({
        container: mapContainer.current, // reference to the map container
        style: "mapbox://styles/mapbox/streets-v11", // style of the map
        center: point, // starting position [lng, lat]
        zoom: 12, // starting zoom
      });
  
      // Add a marker at the provided point
      new mapboxgl.Marker()
        .setLngLat(point) // position of the marker
        .addTo(map.current); // add the marker to the map
    }, [point]); // re-run the effect if the point changes
  
    return <div ref={mapContainer} style={{ width: "60%", height: "300px" }} />;
};

export default PropertyMap;