import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const ACCESS_TOKEN =
  "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";
mapboxgl.accessToken = ACCESS_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: ACCESS_TOKEN });

// Update to ensure `addresses` is always an array
const getCoordinates = async (addresses) => {
  // Ensure `addresses` is an array, even if a single string is passed
  if (!Array.isArray(addresses)) {
    addresses = [addresses];
  }

  try {
    const coordinatePromises = addresses.map((address, index) =>
      geocodingClient
        .forwardGeocode({
          query: address,
          limit: 1,
        })
        .send()
        .then((response) => ({
          index,
          address, // Include the original address string
          coordinates:
            response.body.features.length > 0
              ? response.body.features[0].geometry.coordinates
              : null,
        }))
    );
    const responses = await Promise.all(coordinatePromises);
    const coordinates = responses.filter((response) => response.coordinates);
    console.log("Coordinates with Addresses:", coordinates);
    return coordinates;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return [];
  }
};

const PropertyMap = ({ point }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [rawCoords, setRawCoords] = useState(null); // State to hold coordinates

  useEffect(() => {
    // Fetch the coordinates based on the point
    const fetchCoordinates = async () => {
      const coords = await getCoordinates(point);
      if (coords.length > 0) {
        setRawCoords(coords[0].coordinates); // Use the first result's coordinates
      }
    };
    fetchCoordinates();
  }, [point]);

  useEffect(() => {
    if (map.current || !rawCoords) return; // Initialize map only once and if coordinates are available

    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the map container
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: rawCoords, // Center map at coordinates [lng, lat]
      zoom: 12, // Starting zoom level
    });

    // Add a marker at the fetched coordinates
    new mapboxgl.Marker().setLngLat(rawCoords).addTo(map.current);
  }, [rawCoords]); // Re-run when rawCoords updates

  return <div ref={mapContainer} style={{ width: "100%", height: "200px" }} />;
};

export default PropertyMap;
