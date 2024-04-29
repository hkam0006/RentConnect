import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const ApplicationForm = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleViewClick = () => {
    setIsPopupVisible(true);
  };

  const handleCloseClick = () => {
    setIsPopupVisible(false);
  };

  return (
    <Dialog
      open={isPopupVisible}
      onClose={handleCloseClick}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Application Details</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Phone" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date of Birth"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" style={{ marginTop: 16 }}>
            <Button onClick={handleCloseClick} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" style={{ marginLeft: 8 }}>
              Submit
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;
