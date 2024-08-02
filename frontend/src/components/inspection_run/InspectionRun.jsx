import NavigationMenu from "../navigation_menu/NavigationMenus";
import React, { useEffect, useState } from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
import { supabase } from "../../supabase";

const InspectionRun = () => {
    const [activeSection, setActiveSection] = useState("inspection");
    const [inspectionsData, setInspectionsData] = useState([]);
  
    useEffect(() => {
      const fetchInspectionsData = async () => {
        try {
          const { data: inspections, error: inspectionsError } = await supabase
            .from("INSPECTION")
            .select("*");
  
          if (inspectionsError) {
            throw inspectionsError;
          }
  
          const { data: properties, error: propertiesError } = await supabase
            .from("PROPERTY")
            .select("*");
  
          if (propertiesError) {
            throw propertiesError;
          }
  
          const { data: inspectionRuns, error: inspectionRunsError } =
            await supabase.from("INSPECTION RUN").select("*");
  
          if (inspectionRunsError) {
            throw inspectionRunsError;
          }
  
          const mergedInspectionsData = inspections.map((inspection) => {
            const property = properties.find(
              (property) => property.property_id === inspection.property_id
            );
  
            const inspectionRun = inspectionRuns.find(
              (inspectionRun) =>
                inspectionRun.inspection_run_id === inspection.inspection_run_id
            );
  
            return {
              ...inspection,
              propertyData: property || {},
              inspectionRunData: inspectionRun || {},
            };
          });
  
          setInspectionsData(mergedInspectionsData);
        } catch (error) {
          console.error("Error fetching inspection data:", error);
        }
      };
  
      fetchInspectionsData();
    }, []);
  
    return (
      <div>
        <NavigationMenu>
          <Grid
            container
            spacing={2}
            style={{ padding: "30px", paddingTop: "110px" }}
            justifyContent="flex-start"
          >
          </Grid>
          <div style={{ padding: "20px" }}>
            {activeSection === "inspection" && (
              <Typography variant="h5">
                Inspections Runs: ({inspectionsData.length})
                <Grid container spacing={2} style={{ paddingTop: "20px" }}>
                  {inspectionsData.map((inspection) => (
                    <Grid item key={inspection.id} xs={12}>
                      <Box display="flex" alignItems="flex-start">
                        <img
                          src={
                            inspection.propertyData.property_pictures?.[0] ||
                            "default_image_path.jpg"
                          }
                          alt="Property"
                          style={{
                            width: 300,
                            height: 200,
                            objectFit: "cover",
                            borderRadius: 8,
                            marginRight: 16,
                          }}
                        />
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          gap={2}
                        >
                          <Typography variant="h5">
                            {inspection.propertyData.property_street_number}{" "}
                            {inspection.propertyData.property_street_name},{" "}
                            {inspection.propertyData.property_suburb},{" "}
                            {inspection.propertyData.property_state}
                          </Typography>
                          <Typography variant="body1">
                            Date: {inspection.inspection_date},{" "}
                            {inspection.inspectionRunData.inspection_run_date}
                          </Typography>
                          <Typography variant="body1">
                            Time: {inspection.inspection_start}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Typography>
            )}
          </div>
        </NavigationMenu>
      </div>
    );
  };

  export default InspectionRun;