import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function EditPropertyModal({ open, handleClose, data, setData, handleSubmit }) {
  
  const handleInputChange = e => {
    const { name, value } = e.target;
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
            name="name"
            label="Street"
            type="text"
            fullWidth
            variant="standard"
            value={data.street}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            variant="standard"
            value={data.type}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={data.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={data.description}
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
