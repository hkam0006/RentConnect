import NavigationMenu from "../navigation_menu/NavigationMenus";
import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { supabase } from "../../supabase";
import { styled } from "@mui/material/styles";
import MapComponent from "./MapNav"; // Ensure the updated MapNav component is used

const InspectionRun = () => {
  const [activeSection, setActiveSection] = useState("inspection");
  const [inspectionsData, setInspectionsData] = useState([]);
  const [mapData, setMapData] = useState({
    origin: "",
    destination: "",
    waypoints: [],
  });

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

        const { data: propertyManager, error: propertyManagerError } =
          await supabase.from("PROPERTY MANAGER").select("*");

        if (propertyManagerError) {
          throw propertyManagerError;
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
              inspectionRun.Inspection_run_id === inspection.Inspection_run_id
          );
          const propertyManagerData = inspectionRun
            ? propertyManager.find(
                (manager) =>
                  manager.property_manager_id ===
                  inspectionRun.property_manager_id
              )
            : null;

          return {
            ...inspection,
            propertyData: property || {},
            inspectionRunData: inspectionRun || {},
            propertyManagerData: propertyManagerData || {},
          };
        });

        setInspectionsData(mergedInspectionsData);
      } catch (error) {
        console.error("Error fetching inspection data:", error);
      }
    };

    fetchInspectionsData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const fullAddress = (number, name, type, suburb, state) => {
    return `${number} ${name} ${type}, ${suburb}, ${state}`;
  };

  // Updated handleShowRoute to accommodate flexible origin/destination
  const handleShowRoute = (propertyManagerId) => {
    const filteredInspections = inspectionsData.filter(
      (inspection) =>
        inspection.propertyManagerData.property_manager_id ===
        propertyManagerId
    );

    if (filteredInspections.length >= 2) {
      const addresses = filteredInspections.map((inspection) =>
        fullAddress(
          inspection.propertyData.property_street_number,
          inspection.propertyData.property_street_name,
          inspection.propertyData.property_type,
          inspection.propertyData.property_suburb,
          inspection.propertyData.property_state
        )
      );

      // Dynamic assignment of origin, destination, and waypoints
      const origin = addresses[0];
      const destination = addresses[addresses.length - 1];
      const waypoints = addresses.slice(1, -1);

      setMapData({ origin, destination, waypoints });
      console.log("Origin:", origin);
      console.log("Destination:", destination);
      console.log("Waypoints:", waypoints);
    }
  };

  return (
    <div>
      <NavigationMenu>
        <Grid
          container
          spacing={2}
          style={{ padding: "30px", paddingTop: "110px" }}
          justifyContent="flex-start"
        />
        <div style={{ padding: "20px" }}>
          {activeSection === "inspection" && (
            <Typography variant="h5">Inspections Runs</Typography>
          )}
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label="Table of properties"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography fontSize={"12px"} fontWeight={700}>
                    Property Manager
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontWeight={700} fontSize={"12px"}>
                    Property Address
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontWeight={700} fontSize={"12px"}>
                    Inspection Time and Date
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontWeight={700} fontSize={"12px"}>
                    Duration
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography fontWeight={700} fontSize={"12px"}>
                    Show Route
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inspectionsData.map((inspection) => (
                <TableRow
                  key={inspection.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body" fontWeight={700}>
                      {
                        inspection.propertyManagerData
                          .property_manager_first_name
                      }{" "}
                      {
                        inspection.propertyManagerData
                          .property_manager_last_name
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body" fontWeight={700}>
                      {fullAddress(
                        inspection.propertyData.property_street_number,
                        inspection.propertyData.property_street_name,
                        inspection.propertyData.property_type,
                        inspection.propertyData.property_suburb,
                        inspection.propertyData.property_state
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body" fontWeight={700}>
                      {inspection.inspectionRunData.inspection_run_date} at{" "}
                      {inspection.inspection_start}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body" fontWeight={700}>
                      {inspection.inspection_duration}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() =>
                        handleShowRoute(
                          inspection.propertyManagerData.property_manager_id
                        )
                      }
                    >
                      Show Route
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pass the updated mapData to the MapComponent */}
        <MapComponent
          origin={mapData.origin}
          destination={mapData.destination}
          waypoints={mapData.waypoints}
        />
      </NavigationMenu>
    </div>
  );
};

export default InspectionRun;
