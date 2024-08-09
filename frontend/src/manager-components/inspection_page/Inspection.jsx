import NavigationMenu from "../navigation_menu/NavigationMenus";
import React, { useEffect, useState } from "react";
import { Typography, Button, Grid, Paper, Stack } from "@mui/material";
import { supabase } from "../../supabase";
import InspectionTable from "./InspectionTable";
import HistoryTable from "./HistoryTable";

const Inspection = () => {
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

  const pendingInspections = inspectionsData.filter(
    (inspection) => inspection.inspection_type === "pending"
  );

  return (
    <NavigationMenu>
      <Grid
        container
        spacing={2}
        style={{ padding: "30px", paddingTop: "110px" }}
        justifyContent="flex-start"
      >
        <Button
          variant={activeSection === "inspection" ? "contained" : "outlined"}
          onClick={() => setActiveSection("inspection")}
          style={{ margin: "10px", fontSize: "150%" }}
        >
          Inspection
        </Button>

        <Button
          variant={activeSection === "history" ? "contained" : "outlined"}
          onClick={() => setActiveSection("history")}
          style={{ margin: "10px", fontSize: "150%" }}
        >
          History
        </Button>
      </Grid>
      <div style={{ padding: "20px" }}>
        {activeSection === "inspection" && pendingInspections.length > 0 && (
          <InspectionTable
            inspectionsData={inspectionsData}
            setInspections={setInspectionsData}
          />
        )}
        {activeSection === "inspection" && pendingInspections.length === 0 && (
          <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
            <Stack textAlign="center">
              <Typography variant="h6">No inspections available.</Typography>
            </Stack>
          </Paper>
        )}
        {activeSection === "history" && inspectionsData.length > 0 && (
          <HistoryTable inspectionsData={inspectionsData} />
        )}
        {activeSection === "history" && inspectionsData.length === 0 && (
          <Paper sx={{ borderRadius: 3, padding: 2, marginTop: 2 }}>
            <Stack textAlign="center">
              <Typography variant="h6">
                No inspection history available.
              </Typography>
            </Stack>
          </Paper>
        )}
      </div>
    </NavigationMenu>
  );
};

export default Inspection;
