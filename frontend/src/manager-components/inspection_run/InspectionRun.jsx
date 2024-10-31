import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Modal, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  Avatar
} from "@mui/material";
import { supabase } from "../../supabase";
import { styled } from "@mui/material/styles";
import NavigationMenu from "../navigation_menu/NavigationMenus";
import MapComponent from "./MapNav";
import { Link } from "react-router-dom";

/* Shows the inspection runs that a property manager might have. 

Shows the name of the manager, location of inspection, date and time, duration and button to show route

Route is not shown if only one inspection 

Allows input of origin and destination in map modal
*/
const InspectionRun = () => {
  const [activeSection, setActiveSection] = useState("inspection");
  const [inspectionsData, setInspectionsData] = useState([]);
  const [mapData, setMapData] = useState({
    origin: "",
    destination: "",
    waypoints: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedPropertyManagerId, setSelectedPropertyManagerId] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

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
  
// handles showing routes
  const handleShowRoute = (propertyManagerId) => {
    setSelectedPropertyManagerId(propertyManagerId);
    // Filter inspections based on the selected property manager ID
    const filteredInspections = inspectionsData.filter(
      (inspection) =>
        inspection.propertyManagerData.property_manager_id ===
        propertyManagerId
    );
    // Function to check if the button should be disabled

    // Open the modal only if there is more than 1 inspection
    if (filteredInspections.length > 1) {
      setOpenModal(true);
    } else {
      console.log("Not enough inspections to show the route.")
    }

  };
  // if only one property address
  const isShowRouteDisabled = (propertyManagerId) => {
    const filteredInspections = inspectionsData.filter(
      (inspection) =>
        inspection.propertyManagerData.property_manager_id === propertyManagerId
    );
    return filteredInspections.length == 1;
  };

  const handleSaveRoute = () => {
    if (selectedPropertyManagerId) {
      const filteredInspections = inspectionsData.filter(
        (inspection) =>
          inspection.propertyManagerData.property_manager_id ===
          selectedPropertyManagerId
      );

      const addresses = filteredInspections.map((inspection) =>
        fullAddress(
          inspection.propertyData.property_street_number,
          inspection.propertyData.property_street_name,
          inspection.propertyData.property_type,
          inspection.propertyData.property_suburb,
          inspection.propertyData.property_state
        )
      );

      const origin = selectedOrigin || addresses[0];
      const destination = selectedDestination || addresses[addresses.length - 1];
      const waypoints = addresses.filter(
        (address) => address !== origin && address !== destination
      );

      setMapData({ origin, destination, waypoints });
    }
  };
// handling for map modal
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal when user clicks outside or on close button
  };

  // Filter inspections based on selectedPropertyManagerId
  const filteredInspections = inspectionsData.filter(
    (inspection) =>
      inspection.propertyManagerData.property_manager_id ===
      selectedPropertyManagerId
  );

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
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        src={inspection.propertyManagerData.property_manager_dp || ""}
                        alt="Property Manager"
                        sx={{ width: 32, height: 32, marginRight: 1 }}
                      >
                        {!inspection.propertyManagerData.property_manager_dp && <PersonIcon />}
                      </Avatar>
                      <Typography variant="body" fontWeight={700}>
                        <Link href="#" to={`/PMprofile/${inspection.propertyManagerData.property_manager_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                          {inspection.propertyManagerData?.property_manager_first_name} {inspection.propertyManagerData?.property_manager_last_name}
                        </Link>
                      </Typography>
                    </Box>
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
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleShowRoute(
                          inspection.propertyManagerData.property_manager_id
                        )
                      }
                      disabled={isShowRouteDisabled(
                        inspection.propertyManagerData.property_manager_id
                      )}
                    >
                      Show Route
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* MUI Modal for displaying the map */}
        <Modal open={openModal} onClose={handleCloseModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" }, 
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: { xs: 2, sm: 4 },
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <div>
          <Typography variant="subtitle1">Select Origin:</Typography>
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "1rem",
            }}
          >
            <option value="">--Select Origin--</option>
            {filteredInspections.map((inspection) => (
              <option
                key={inspection.id}
                value={fullAddress(
                  inspection.propertyData.property_street_number,
                  inspection.propertyData.property_street_name,
                  inspection.propertyData.property_type,
                  inspection.propertyData.property_suburb,
                  inspection.propertyData.property_state
                )}
              >
                {fullAddress(
                  inspection.propertyData.property_street_number,
                  inspection.propertyData.property_street_name,
                  inspection.propertyData.property_type,
                  inspection.propertyData.property_suburb,
                  inspection.propertyData.property_state
                )}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="subtitle1">Select Destination:</Typography>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            style={{
              width: "100%", // Full width on smaller screens
              padding: "8px",
              fontSize: "1rem",
            }}
          >
            <option value="">--Select Destination--</option>
            {filteredInspections.map((inspection) => (
              <option
                key={inspection.id}
                value={fullAddress(
                  inspection.propertyData.property_street_number,
                  inspection.propertyData.property_street_name,
                  inspection.propertyData.property_type,
                  inspection.propertyData.property_suburb,
                  inspection.propertyData.property_state
                )}
              >
                {fullAddress(
                  inspection.propertyData.property_street_number,
                  inspection.propertyData.property_street_name,
                  inspection.propertyData.property_type,
                  inspection.propertyData.property_suburb,
                  inspection.propertyData.property_state
                )}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="contained"
          onClick={handleSaveRoute}
          style={{ marginTop: '20px', width: "100%" }} 
        >
          Show Route on Map
        </Button>
      </div>
      <MapComponent
        origin={mapData.origin}
        destination={mapData.destination}
        waypoints={mapData.waypoints}
        style={{ flex: 1, minHeight: "300px" }} 
      />
    </div>
  </Box>
</Modal>

      </NavigationMenu>
    </div>
  );
};

export default InspectionRun;
