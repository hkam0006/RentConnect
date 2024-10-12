import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
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
  return { formattedDate, formattedTime };
};

const InspectionTable = ({ inspectionsData, setInspections }) => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    async function getUserID() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUserID(value.data.user.id);
        }
      });
    }
    getUserID();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [openCancelBtn, setOpenCancelBtn] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpenCancelBtn = (inspection) => {
    setSelectedInspection(inspection);
    setOpenCancelBtn(true);
  };

  const handleCloseCancelBtn = () => {
    setOpenCancelBtn(false);
  };

  const handleSubmitReason = async () => {
    try {
      const { error } = await supabase
        .from("INSPECTION")
        .update({ pm_msg: message })
        .eq("inspection_id", selectedInspection.inspection_id);

      if (error) {
        console.error("Error updating message:", error);
      } else {
        console.log("Message updated successfully");
        console.log(selectedInspection.renterData.renter_email);
        sendEmail(
          selectedInspection.renterData.renter_email,
          "Inspection Cancelled",
          `Your inspection has been cancelled. Reason: ${message}`
        );
      }
      updateType(selectedInspection.inspection_id, "unapproved");
      setOpenCancelBtn(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickOpen = (inspection) => {
    setSelectedInspection(inspection);
    setNewDateTime(inspection.inspection_date_time);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInspection(null);
  };

  const handleSave = async (inspectionId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("INSPECTION")
        .update({ inspection_date_time: newDateTime })
        .eq("inspection_id", inspectionId);
      if (error) {
        console.log("Supabase update error:", error.message);
        return;
      }
      setInspections((prevInspections) =>
        prevInspections.map((inspection) =>
          inspection.inspection_id === inspectionId
            ? { ...inspection, inspection_date_time: newDateTime }
            : inspection
        )
      );
      handleClose();
    } catch (error) {
      console.log("Handle save error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToRun = async (inspectionId, newType) => {
    try {
      const { data: inspectionData, error: fetchError } = await supabase
        .from("INSPECTION")
        .select("*")
        .eq("inspection_id", inspectionId)
        .single();

      if (fetchError) throw fetchError;

      const { data: runData, error: insertError } = await supabase
        .from("INSPECTION RUN")
        .insert([
          {
            inspection_run_default_buffer: inspectionData.inspection_buffer,
            company_id: inspectionData.company_id,
            inspection_run_date: new Date().toISOString().split("T")[0],
            property_manager_id: userID,
            inspection_run_transportation: "Car",
          },
        ]);

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from("INSPECTION")
        .update({ inspection_type: newType })
        .eq("inspection_id", inspectionId);

      if (updateError) throw updateError;

      setInspections((prevInspections) =>
        prevInspections.map((inspection) =>
          inspection.inspection_id === inspectionId
            ? { ...inspection, inspection_type: newType }
            : inspection
        )
      );

      sendEmail(
        inspectionData.renterData.renter_email,
        "Inspection Confirmed",
        "Your inspection is confirmed for the scheduled time."
      );
    } catch (error) {
      console.log("Error in addToRun:", error.message);
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
      return "N/A";
    }

    const firstInitial = renter.renter_first_name.charAt(0).toUpperCase();
    const lastInitial = renter.renter_last_name.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  // Function to send an email directly
  const sendEmail = (renterEmail, subject, message) => {
    const templateParams = {
      user_email: renterEmail,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "service_uur4q0o",
        "template_h8ads0m",
        templateParams,
        "AvP0neM1CNskMJv29"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.log("Email sending failed:", error.text);
        }
      );
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
              <StyledTableCell align="left" sx={{ flexGrow: 1 }}>
                <Typography fontSize={"12px"} fontWeight={700}>
                  Location{" "}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ flexGrow: 1 }}>
                <Typography fontWeight={700} fontSize={"12px"}>
                  Date and Time
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ flexGrow: 1 }}>
                <Typography fontWeight={700} fontSize={"12px"}>
                  Attendees
                </Typography>
              </StyledTableCell>

              <StyledTableCell align="left" sx={{ width: "150px" }}>
                <Typography fontWeight={700} fontSize={"12px"}>
                  Actions
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingInspections.map((inspection) => {
              const { formattedDate, formattedTime } = formatDateTime(
                inspection.inspection_date_time
              );
              return (
                <TableRow key={inspection.inspection_id}>
                  <TableCell align="left" sx={{ flexGrow: 1 }}>
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

                  <TableCell align="left" sx={{ flexGrow: 1 }}>
                    <Typography>{formattedDate}</Typography>
                    <Typography>{formattedTime}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ flexGrow: 1 }}>
                    <Avatar>{getRenterInitials(inspection.renterData)}</Avatar>
                  </TableCell>

                  <TableCell align="left" sx={{ width: "150px" }}>
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
                          addToRun(inspection.inspection_id, "confirmed")
                        }
                      >
                        Confirm
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ width: "80px" }}
                        onClick={() => handleClickOpenCancelBtn(inspection)}
                      >
                        Unapprove
                      </Button>
                      <Dialog
                        open={openCancelBtn}
                        onClose={handleCloseCancelBtn}
                      >
                        <DialogTitle>Cancel Inspection</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please leave a reason to renter.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Reason for unapproval"
                            type="text"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseCancelBtn}
                            color="primary"
                          >
                            Close
                          </Button>
                          <Button onClick={handleSubmitReason} color="success">
                            Submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
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
            label="Date and Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={newDateTime ? new Date(new Date(newDateTime).getTime() + 11 * 60 * 60 * 1000).toISOString().slice(0, 16) : ''}
            onChange={(e) => setNewDateTime(e.target.value)}
            // Prevent selecting the current day and time by setting min to tomorrow's date
            inputProps={{
              min: new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .slice(0, 16),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSave(selectedInspection.inspection_id)}
            color="primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InspectionTable;
