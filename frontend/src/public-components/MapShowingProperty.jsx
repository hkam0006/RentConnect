import React, {useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import DrivingInstructionsBox from "../manager-components/inspection_run/DrivingInstructionsBox";
import AppLoader from "../manager-components/property_page/AppLoader";

// map setup
const ACCESS_TOKEN =
    "pk.eyJ1IjoicGRldjAwMTAiLCJhIjoiY2x6ajVxNG1nMG4xOTJucTE1MHY4bDF2bCJ9.HfHy4wIk1KMg658ISOLoRQ";
const geocodingClient = mbxGeocoding({ accessToken: ACCESS_TOKEN });

// returns a formatted string of the address
const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`;
};

// gets the coordinates of provided array and returns as array
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
                    index, // Capture the original index
                    coordinates:
                        response.body.features.length > 0
                            ? response.body.features[0].geometry.coordinates
                            : null,
                }))
        );

        const responses = await Promise.all(coordinatePromises);
        return responses.filter((response) => response.coordinates);
    } catch (error) {
        console.error("Geocoding failed:", error);
        return [];
    }
};

/**
 * A component which shows a Mapbox which is centered and has a marker placed on the provided property.
 *
 * @param {Property} property the property to display on the map
 * @returns the map to display
 * @author Luke Phillips
 */
export default function MapShowingProperty({property}) {
    const address = [fullAddress(property[0].property_street_number, property[0].property_street_name, property[0].property_street_type, property[0].property_suburb, property[0].property_state)];

    const [coords, setCoords] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCoordinates = async () => {
            const rawCoords = await getCoordinates(address);
            if (rawCoords.length <= 0) {
                setCoords([]);
                setLoading(false);
                return;
            }
            setLoading(false);
            setCoords(rawCoords);
        };

        fetchCoordinates();
    }, []);

    useEffect(() => {
        if (!loading && coords.length > 0) {
            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v12",
                center: coords[0].coordinates,
                zoom: 13,
                accessToken: ACCESS_TOKEN,
            });

            // add marker at location
            new mapboxgl.Marker().setLngLat(coords[0].coordinates).addTo(map)

            return () => map.remove();
        }
    }, [loading, coords]);

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
                    width: "100%",
                    height: "500px",
                    border: "5px solid #4CAF50",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            />
        </div>
    );
}