import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NavigationMenu from "../navigation_menu/NavigationMenus";

const Application = () => {
  const [applicationsData, setApplicationsData] = useState([]);

  useEffect(() => {
    const fetchApplicationsData = async () => {
      try {
        const { data: applications, error: applicationsError } = await supabase
          .from("APPLICATION")
          .select("*");

        if (applicationsError) {
          throw applicationsError;
        }

        const { data: properties, error: propertiesError } = await supabase
          .from("PROPERTY")
          .select("*");

        if (propertiesError) {
          throw propertiesError;
        }

        const applicationsWithProperties = applications.map((application) => {
          const property = properties.find(
            (property) => property.property_id === application.property_id
          );

          return property
            ? { ...application, propertyData: property }
            : { ...application, propertyData: {} };
        });

        setApplicationsData(applicationsWithProperties);
      } catch (error) {
        console.error("Error fetching applications data:", error);
      }
    };

    fetchApplicationsData();
  }, []);

  return (
    <div>
      <NavigationMenu>
        <Grid
          container
          spacing={2}
          style={{ padding: "20px", paddingTop: "80px" }}
          justifyContent="flex-start"
        >
          {applicationsData.map((application) => (
            <Grid item key={application.id} xs={12} sm={6} md={4}>
              <Card style={{ maxWidth: 450 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    application.propertyData.property_pictures?.[0] ||
                    "default_image_path.jpg"
                  }
                  alt="Property"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {application.propertyData.property_address}
                  </Typography>
                  <Grid
                    container
                    justifyContent="space-between"
                    style={{ marginTop: 16 }}
                  >
                    <Typography variant="body1">
                      <BedIcon />:{" "}
                      {application.propertyData.property_bedroom_count}
                    </Typography>
                    <Typography variant="body1">
                      <BathtubIcon />:{" "}
                      {application.propertyData.property_bathroom_count}
                    </Typography>
                    <Typography variant="body1">
                      <DirectionsCarIcon />:{" "}
                      {application.propertyData.property_car_spot_count}
                    </Typography>

                    <Grid justifyContent="flex-end">
                      <Typography variant="body1">
                        Rent: {application.propertyData.property_price}/wk
                      </Typography>
                      <Typography variant="body1">
                        Lease Start:{" "}
                        {new Date(
                          application.application_lease_start
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Link
                    to={`/ApplicationDetails/${application.company_id}/${application.property_id}/${application.renter_id}`}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: 16 }}
                    >
                      View Application
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </NavigationMenu>
    </div>
  );
};

export default Application;
