import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material";
import Image from "./Image";
import { supabase } from "../../supabase"; // Make sure this is the correct import path

const fullAddress = (number, name, suburb, state) => {
  return `${number} ${name}, ${suburb}, ${state}`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const InspectionTable = ({ inspectionsData, setInspections }) => {
  const updateType = async (inspectionId, type) => {
    try {
      const { data, error } = await supabase
        .from("INSPECTION")
        .update({ inspection_type: type })
        .eq("inspection_id", inspectionId);
      if (error) throw error;
      // Update the state with the new data
      setInspections((prevInspections) =>
        prevInspections.map((inspection) =>
          inspection.inspection_id === inspectionId
            ? { ...inspection, inspection_type: type }
            : inspection
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const pendingInspections = inspectionsData.filter(
    (inspection) => inspection.inspection_type === "pending"
  );

  return (
    <TableContainer sx={{ borderRadius: 3, height: "700px" }}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        aria-label="Table of pending inspections"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ flexGrow: 1 }}>
              <Typography fontSize={"12px"} fontWeight={700}>
                Location{" "}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Date and Time
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Attendees
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Approvals
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "150px" }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Actions
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell sx={{ flexGrow: 1 }}>
                <Typography variant="body" fontWeight={700}>
                  {fullAddress(
                    inspection.propertyData.property_street_number,
                    inspection.propertyData.property_street_name,
                    inspection.propertyData.property_suburb,
                    inspection.propertyData.property_state
                  )}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="start">
                  <Image
                    sx={{
                      height: "150px",
                      width: "264px",
                      borderRadius: 3,
                    }}
                    src={inspection.propertyData.property_pictures?.[0]}
                    alt="Property"
                  />
                </Stack>
              </TableCell>

              <TableCell align="right" sx={{ flexGrow: 1 }}>
                {inspection.inspectionRunData.inspection_run_date} <br /> at{" "}
                {inspection.inspection_start}
              </TableCell>
              <TableCell align="right" sx={{ flexGrow: 1 }}>
                Hello
              </TableCell>
              <TableCell align="right" sx={{ flexGrow: 1 }}>
                world
              </TableCell>
              <TableCell align="center" sx={{ width: "150px" }}>
                <Stack direction="column" spacing={1} alignItems="center">
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    sx={{ width: "80px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    sx={{ width: "80px" }}
                    onClick={() =>
                      updateType(inspection.inspection_id, "completed")
                    }
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ width: "80px" }}
                    onClick={() =>
                      updateType(inspection.inspection_id, "unapproved")
                    }
                  >
                    Unapprove
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InspectionTable;
