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
import Image from "./ImageRenter";
import { supabase } from "../../supabase";

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

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} at ${formattedTime}`;
};

const HistoryTableRenter = ({ inspectionsData, setInspections }) => {
  const historyInspections = inspectionsData.filter(
    (inspection) =>
      inspection.inspection_type === "completed" ||
      inspection.inspection_type === "unapproved" ||
      inspection.inspection_type === "confirmed" ||
      inspection.inspection_type === "cancelled"
  );

  const revertToPending = async (inspectionId, type) => {
    try {
      const { error } = await supabase
        .from("INSPECTION")
        .update({ inspection_type: type })
        .eq("inspection_id", inspectionId);
      if (error) throw error;
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

  return (
    <TableContainer sx={{ borderRadius: 3, height: "700px" }}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        aria-label="Table of inspection history"
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
                Status
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ flexGrow: 1 }}>
              <Typography fontWeight={700} fontSize={"12px"}>
                Actions
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyInspections.map((inspection) => (
            <TableRow key={inspection.inspection_id}>
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
                {formatDateTime(inspection.inspection_date_time)}
              </TableCell>
              <TableCell align="right" sx={{ flexGrow: 1 }}>
                {inspection.inspection_type}
              </TableCell>
              <TableCell align="right" sx={{ flexGrow: 1 }}>
                {inspection.inspection_type === "cancelled" && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      revertToPending(inspection.inspection_id, "pending")
                    }
                  >
                    Revert to Pending
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTableRenter;
