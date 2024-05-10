import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import {
  Box,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ReceivedApplication = () => {
  const [properties, setProperties] = useState([]);
  const [application, setApplication] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("PROPERTY").select("*");

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        console.log("Fetched properties:", data);
        setProperties(data);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchApplication = async () => {
      const { data, error } = await supabase.from("APPLICATION").select("*");

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        console.log("Fetched properties:", data);
        setApplication(data);
      }
    };

    fetchApplication();
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: 24 }}>
      {properties.map((property) => (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          style={{ marginBottom: 10 }}
          sx={{
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: 3,
          }}
          key={property.property_id}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ padding: 2, width: "60%", borderRadius: "16px" }}>
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
                <Typography
                  gutterBottom
                  variant="body"
                  component="div"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
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

                <Button
                  endIcon={<ExpandMoreIcon />}
                  onClick={() => console.log("Dropdown clicked!")}
                >
                  More
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          ></Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReceivedApplication;
