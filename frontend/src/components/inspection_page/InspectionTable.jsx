import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar,
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
  const [open, setOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (inspection) => {
    setSelectedInspection(inspection);
    setNewDate(inspection.inspectionRunData.inspection_run_date);
    setNewTime(inspection.inspection_start);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInspection(null);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const { data: inspectionData, error: inspectionError } = await supabase
        .from("INSPECTION")
        .update({
          inspection_start: newTime,
        })
        .eq("inspection_id", selectedInspection.inspection_id);

      if (inspectionError) {
        console.error("Error updating INSPECTION table:", inspectionError);
        setLoading(false);
        return;
      }

      const { data: inspectionRunData, error: inspectionRunError } =
        await supabase
          .from("`INSPECTION RUN`")
          .update({
            inspection_run_date: newDate,
          })
          .eq("inspection_run_id", selectedInspection.inspection_run_id);

      if (inspectionRunError) {
        console.error(
          "Error updating INSPECTION RUN table:",
          inspectionRunError
        );
        setLoading(false);
        return;
      }

      // Ensure the state is updated and forces re-render
      setInspections((prevInspections) => {
        return prevInspections.map((inspection) =>
          inspection.inspection_id === selectedInspection.inspection_id
            ? {
                ...inspection,
                inspectionRunData: {
                  ...inspection.inspectionRunData,
                  inspection_run_date: newDate,
                },
                inspection_start: newTime,
              }
            : inspection
        );
      });

      // Delay closing to ensure re-render
      setTimeout(() => {
        setLoading(false);
        handleClose();
      }, 100); // Add a small delay to ensure state is updated before closing the dialog
    } catch (error) {
      console.log("Unexpected error:", error.message);
      setLoading(false);
    }
  };

  const updateType = async (inspectionId, type) => {
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

  const pendingInspections = inspectionsData.filter(
    (inspection) => inspection.inspection_type === "pending"
  );

  const getRenterInitials = (renter) => {
    if (!renter || !renter.renter_first_name || !renter.renter_last_name) {
      return "N/A"; // Return "N/A" if renter or their name fields are undefined
    }

    const firstInitial = renter.renter_first_name.charAt(0).toUpperCase();
    const lastInitial = renter.renter_last_name.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  return (
    <>
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

              <StyledTableCell align="center" sx={{ width: "150px" }}>
                <Typography fontWeight={700} fontSize={"12px"}>
                  Actions
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingInspections.map((inspection) => (
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
                  {inspection.inspectionRunData.inspection_run_date} <br /> at{" "}
                  {inspection.inspection_start}
                </TableCell>
                <TableCell align="right" sx={{ flexGrow: 1 }}>
                  <Avatar>{getRenterInitials(inspection.renterData)}</Avatar>
                </TableCell>

                <TableCell align="center" sx={{ width: "150px" }}>
                  <Stack direction="column" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      sx={{ width: "80px" }}
                      onClick={() => handleClickOpen(inspection)}
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

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Inspection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the date and time of the inspection.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            variant="outlined"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InspectionTable;
