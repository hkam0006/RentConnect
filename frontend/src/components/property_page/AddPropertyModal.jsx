import React, { useState } from 'react'
import { Typography, Stack, Button, Modal, Box, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material"


export default function AddPropertyModal({ open, handleClose }) {
  const [type, setType] = useState(null);

  const [freq, setFreq] = useState("Per Week")

  const handleChangeFreq = (event) => {
    setFreq(event.target.value)
  }

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Property
        </Typography>
        <Stack spacing={2} mt={1}>
          <TextField label="Address" required />
          <FormControl>
            <InputLabel id="property-type-select-label">Property Type</InputLabel>
            <Select
              required
              label="Property Type"
              id="property-type-select"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Studio">Studio</MenuItem>
            </Select>
          </FormControl>
          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                type='number'
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Payment Frequency</InputLabel>
              <Select
                label="Payment Frequency"
                value={freq}
                onChange={handleChangeFreq}
              >
                <MenuItem value="Per Week">Per Week</MenuItem>
                <MenuItem value="Per Month">Per Month</MenuItem>
                <MenuItem value="Per Year">Per Year</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            label="Lease Start"
            required
          />
          <Typography>Facillities </Typography>
          <Stack direction='row' spacing={1}>
            <FormControl fullWidth >
              <InputLabel htmlFor="bedroom-select">Bedroom(s)</InputLabel>
              <Select
                label="Bedroom(s)"
              // value={freq}
              // onChange={handleChangeFreq}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6+">6+</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="bathroom-select">Bathroom(s)</InputLabel>
              <Select
                label="Bathroom(s)"
              // value={freq}
              // onChange={handleChangeFreq}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6+">6+</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="car-spaces-select">Car Spaces</InputLabel>
              <Select
                label="Car Spaces"
              // value={freq}
              // onChange={handleChangeFreq}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6+">6+</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Button variant='contained'>Confirm</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
