import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function EditPropertyModal({ open, handleClose, data, setData, handleSubmit }) {
  
  const handleInputChange = ({ target: { name, value } }) => {
    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="street_number"
            label="Street Number"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_street_number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="street_name"
            label="Street Name"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_street_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="street_type"
            label="Street Type"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_street_type}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="prop_type"
            label="Property Type"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_type}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="prop_rent"
            label="Rent"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_rent}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="prop_desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="prop_amenities"
            label="Amenities"
            type="text"
            fullWidth
            variant="standard"
            value={data.property_amenities}
            onChange={handleInputChange}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditPropertyModal;
