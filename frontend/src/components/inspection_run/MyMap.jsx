import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import Map from "react-map-gl";

const ACCESS_TOKEN = "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ"

const MyMap = () => {
    return (
        <Map
          mapboxAccessToken= {ACCESS_TOKEN}
          initialViewState={{
            longitude: 145.1275,
            latitude: -37.9145,
            zoom: 14
          }}
          style={{width: 600, height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      );
    }
export default MyMap