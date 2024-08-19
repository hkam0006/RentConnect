import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import DrivingInstructionsBox from "./DrivingInstructionsBox";

const ACCESS_TOKEN = "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";

const geocodingClient = mbxGeocoding({ accessToken: ACCESS_TOKEN });

const getCoordinates = async (addresses) => {
  try {
    const coordinatePromises = addresses.map((address) =>
      geocodingClient
        .forwardGeocode({
          query: address,
          limit: 1,
        })
        .send()
    );

    const responses = await Promise.all(coordinatePromises);

    const coordinates = responses
      .map((response) => {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length > 0
        ) {
          return response.body.features[0].geometry.coordinates;
        } else {
          console.error("Geocoding failed for an address");
          return null;
        }
      })
      .filter((coord) => coord !== null);

    console.log("Coordinates:", coordinates);
    return coordinates;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return [];
  }
};

const MapComponent = ({ origin, destination, waypoints }) => {
  const [coords, setCoords] = useState([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = await getCoordinates([origin, ...waypoints, destination]);
      setCoords(coordinates);
    };

    fetchCoordinates();
  }, [origin, destination, waypoints]);

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

    directions.on("route", (e) => {
      if (e.route && e.route.length > 0) {
        const route = e.route[0];
        let instructionsText = "";

        route.legs.forEach((leg, legIndex) => {
          instructionsText += `<strong>Route ${legIndex + 1}:</strong><br/>`;
          leg.steps.forEach((step, stepIndex) => {
            instructionsText += `${stepIndex + 1}. ${step.maneuver.instruction}<br/>`;
          });
          if (legIndex < route.legs.length - 1) {
            instructionsText += "<hr/>";
          }
        });

        setInstructions(instructionsText);
      } else {
        setInstructions("No route found.");
      }
    });

    directions.on("error", (e) => {
      setInstructions(`Directions error: ${e.error}`);
    });

    return () => map.remove();
  }, [coords]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <div
        id="map"
        style={{
          width: "60%",
          height: "400px",
          border: "5px solid #4CAF50",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
      <DrivingInstructionsBox instructions={instructions} />
    </div>
  );
};

export default MapComponent;
