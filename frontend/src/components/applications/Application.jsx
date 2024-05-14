import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NavigationMenu from '../navigation_menu/NavigationMenus';

const Application = () => {
  const [applicationsData, setApplicationsData] = useState([]);

  useEffect(() => {
    const fetchApplicationsData = async () => {
      try {
        const db = getFirestore(app);
        const applicationsRef = collection(db, "Applications");
        const applicationsSnapshot = await getDocs(applicationsRef);
        let applicationsList = applicationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const propertiesRef = collection(db, "Properties");
        const applicationsListWithProperties = await Promise.all(
          applicationsList.map(async (app) => {
            try {
              const propertyDoc = doc(propertiesRef, app.propertyId);
              const propertySnapshot = await getDoc(propertyDoc);
              if (propertySnapshot.exists()) {
                const propertyData = propertySnapshot.data();

                return { ...app, propertyData };
              } else {
                console.warn(
                  `Property with ID ${app.propertyId} does not exist. Application skipped.`
                );
                return null;
              }
            } catch (error) {
              console.error("Error fetching property data:", error);
              return { ...app, propertyData: {} };
            }
          })
        );

        setApplicationsData(
          applicationsListWithProperties.filter((app) => app !== null)
        );
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
        style={{ padding: "20px", paddingTop: '80px' }}
        justifyContent="flex-start"
      >
        {applicationsData.map((application) => (
          <Grid item key={application.id} xs={12} sm={6} md={4}>
            <Card style={{ maxWidth: 450 }}>
              <CardMedia
                component="img"
                height="300"
                image={application.propertyData.listingImage}
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
                  {application.propertyData.address}
                </Typography>
                <Grid
                  container
                  justifyContent="space-between"
                  style={{ marginTop: 16 }}
                >
                  <Typography variant="body1">
                    <BedIcon />: {application.propertyData.bedrooms}
                  </Typography>
                  <Typography variant="body1">
                    <BathtubIcon />: {application.propertyData.bathrooms}
                  </Typography>
                  <Typography variant="body1">
                    <DirectionsCarIcon />: {application.propertyData.car_spaces}
                  </Typography>

                  <Grid justifyContent="flex-end">
                    <Typography variant="body1">
                      Rent: {application.propertyData.price}/wk
                    </Typography>
                    <Typography variant="body1">
                      Lease Start:{" "}
                      {application.LeaseStart?.toDate().toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Link to={`/ApplicationDetails/${application.id}`}>
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
