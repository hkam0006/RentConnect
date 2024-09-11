import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import DrivingInstructionsBox from "./DrivingInstructionsBox";

const ACCESS_TOKEN =
  "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";

const geocodingClient = mbxGeocoding({ accessToken: ACCESS_TOKEN });

// Updated getCoordinates function to return index along with coordinates
const getCoordinates = async (addresses) => {
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

// New optimizeRoute function to reorder coordinates
// Updated optimizeRoute function to retain addresses
const optimizeRoute = async (coords) => {
  const coordinatesStr = coords.map((c) => c.coordinates.join(",")).join(";");
  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinatesStr}?access_token=${ACCESS_TOKEN}&source=first&destination=last`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.code === "Ok" && data.trips && data.trips.length > 0) {
      const waypoints = data.waypoints.map((wp) => coords[wp.waypoint_index]);
      console.log("Optimized waypoints with addresses:", waypoints);
      return waypoints;
    } else {
      console.error("Route optimization failed:", data.message);
    }
  } catch (error) {
    console.error("Error optimizing route:", error);
  }

  return coords; // Return original if optimization fails
};

const MapComponent = ({ origin, destination, waypoints }) => {
  const [coords, setCoords] = useState([]);
  const [itinerary, setItinerary] = useState([]); // State for the itinerary

  // Updated useEffect to fetch and optimize coordinates
  useEffect(() => {
    const fetchAndOptimizeCoordinates = async () => {
      const rawCoords = await getCoordinates([origin, ...waypoints, destination]);
      if (rawCoords.length < 2) {
        setCoords([]);
        return;
      }

      // Optimize the order of the coordinates
      const optimizedCoords = await optimizeRoute(rawCoords);

      // Extract only the coordinates for the map
      const orderedCoords = optimizedCoords.map((item) => item.coordinates);
      setCoords(orderedCoords);
    // Extract the addresses to display in the itinerary
    const itineraryList = optimizedCoords.map((item) => item.address);
    console.log("Itinerary List:", itineraryList);
    setItinerary(itineraryList);
    };

    fetchAndOptimizeCoordinates();
  }, [origin, destination, waypoints]);

  // Directions setup with optimized coordinates
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: coords[0],
      zoom: 13,
      accessToken: ACCESS_TOKEN,
    });

    const directions = new MapboxDirections({
      accessToken: ACCESS_TOKEN,
      controls: {
        inputs: true,
        instructions: false,
      },
    });

    map.addControl(directions, "top-left");

    if (coords.length > 1) {
      directions.setOrigin(coords[0]);
      directions.setDestination(coords[coords.length - 1]);

      for (let i = 1; i < coords.length - 1; i++) {
        directions.addWaypoint(i - 1, coords[i]);
        new mapboxgl.Marker().setLngLat(coords[i]).addTo(map);
      }
    }

    return () => map.remove();
  }, [coords]);

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <div
        id="map"
        style={{
          width: "70%",
          height: "400px",
          border: "5px solid #4CAF50",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
      <DrivingInstructionsBox itinerary={itinerary} />
    </div>
  );
};

export default MapComponent;
