import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const Application = () => {
  const [applicationsData, setAppliactionsData] = useState([]);

  useEffect(() => {
    const fetchPropertiesData = async () => {
      try {
        // Get properties data
        const db = getFirestore(app);
        const propertiesRef = collection(db, "Applications");
        const propertiesSnapshot = await getDocs(propertiesRef);
        const propertiesList = propertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppliactionsData(propertiesList);
      } catch (error) {
        console.error("Error fetching properties data:", error);
      }
    };

    fetchPropertiesData();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "20px" }}
      justifyContent="flex-start"
    >
      {applicationsData.map((property) => (
        <Grid item key={property.id} xs={12} sm={6} md={4}>
          <Card style={{ maxWidth: 450 }}>
            <CardMedia
              component="img"
              height="300"
              image={property.listingImage}
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
                {property.address}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: 16 }}
              >
                <Typography variant="body1">
                  Bedrooms: {property.bedrooms}
                </Typography>
                <Typography variant="body1">
                  Bathrooms: {property.bathrooms}
                </Typography>
                <Typography variant="body1">
                  Car Spaces: {property.car_spaces}
                </Typography>
                <Typography variant="body1">
                  Rent: {property.price}/wk
                </Typography>
                <Typography variant="body1">
                  Status: {property.status}
                </Typography>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 16 }}
              >
                View Application
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Application;
