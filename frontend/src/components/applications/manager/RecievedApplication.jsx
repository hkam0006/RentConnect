import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const ReceivedApplication = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("PROPERTY")
        .select("*")
        .eq("property_applied", true);

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        console.log("Fetched properties:", data);
        setProperties(data);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.property_id}>
          <Card sx={{ padding: 2 }}>
            <CardMedia
              component="img"
              height="150"
              image={
                property.property_pictures.length > 0
                  ? property.property_pictures[0]
                  : "default_image_path.jpg"
              }
              alt="Property Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {property.property_description}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BedIcon />
                  <Typography>{property.property_bedroom_count}</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BathtubIcon />
                  <Typography>{property.property_bathroom_count}</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <DirectionsCarIcon />
                  <Typography>{property.property_car_spot_count}</Typography>
                </Stack>
              </Stack>
              <Typography>Type: {property.property_type}</Typography>
              <Typography>Rent: ${property.property_rent}</Typography>
              <Typography>
                Available: {property.property_rent_frequency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReceivedApplication;
