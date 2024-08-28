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

const ReceivedApplication = () => {
  const [properties, setProperties] = useState([]);
  const [applications, setApplications] = useState([]);

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
    const fetchApplications = async () => {
      const { data, error } = await supabase.from("APPLICATION").select("*");

      if (error) {
        console.error("Error fetching applications:", error.message);
      } else {
        console.log("Fetched applications:", data);
        setApplications(data);
      }
    };

    fetchApplications();
  }, []);

  const getApplicationCount = (propertyId) => {
    return applications.filter((app) => app.property_id === propertyId).length;
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: 24,
      }}
    >
      {properties.map(
        (property) =>
          getApplicationCount(property.property_id) > 0 && (
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
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    bgcolor: "red",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  {getApplicationCount(property.property_id)}
                </Box>
                <Card sx={{ padding: 5, width: "400px", borderRadius: "16px" }}>
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
                        <Typography>
                          {property.property_bedroom_count}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <BathtubIcon />
                        <Typography>
                          {property.property_bathroom_count}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <DirectionsCarIcon />
                        <Typography>
                          {property.property_car_spot_count}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  width: "60%",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  "&::-webkit-scrollbar": {
                    display: "none",
                    justifyContent: "space-around",
                  },
                  scrollbarWidth: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {applications.map(
                  (app) =>
                    app.property_id === property.property_id && (
                      <Grid
                        item
                        sm={6}
                        md={4}
                        sx={{
                          padding: 2,
                          margin: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                        key={app.application_id}
                      >
                        <Card raised sx={{ height: "250px", width: "250px" }}>
                          {" "}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Application ID: {app.application_id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lease Start: {app.application_lease_start}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Term: {app.application_term} months
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Adults: {app.application_adults_number}, Children:{" "}
                              {app.application_children_number}, Pets:{" "}
                              {app.application_pets_number}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Income: ${app.application_current_income}K
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Status: {app.application_status}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                )}
              </Box>
            </Grid>
          )
      )}
    </Grid>
  );
};

export default ReceivedApplication;
