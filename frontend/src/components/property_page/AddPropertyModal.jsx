import React, { useState } from 'react'
import { Typography, Stack, Button, Modal, Box, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material"
import ListingImage from './listing.jpg'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useApp from '../../hooks/useApp'

export default function AddPropertyModal({ handleClose, handleAdd, rows, propManagers }) {
  const { createProperty } = useApp();

  const [newRow, setNewRow] = useState({
    address: "",
    vacancy: 0,
    attendees: 0,
    applications: 0,
    listingImage: ListingImage,
    type: null,
    price: 0,
    payFreq: "",
    available: "",
    propManager: "",
    bedrooms: "0",
    bathrooms: "0",
    car_spaces: "0",
    vacancy: 0
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setNewRow(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

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

  async function confirmPressed(event) {
    handleAdd(prevState => {
      if (prevState.length > 0) {
        return [
          newRow,
          ...prevState
        ]
      }
      return [newRow]
    })
    await createProperty("testID", newRow)
    handleClose(event)
  }

  const buttonDisabled = !newRow.address || newRow.price <= 0 || !newRow.propManager || !newRow.payFreq || !newRow.type || !newRow.available

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
        <Stack spacing={2} mt={1.5}>
          <FormControl>
            <InputLabel id="property-manager-select-label">Property Manager</InputLabel>
            <Select
              required
              label="Property Manager"
              id="property-type-select"
              value={newRow.propManager}
              onChange={handleChange}
              name='propManager'
            >
              {propManagers.map((manager, index) => (
                <MenuItem key={index} value={manager}>{manager}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Address" required onChange={handleChange} name='address' value={newRow.address} />
          <FormControl>
            <InputLabel id="property-type-select-label">Property Type</InputLabel>
            <Select
              required
              label="Property Type"
              id="property-type-select"
              value={newRow.type}
              onChange={handleChange}
              name='type'
            >
              <MenuItem value={null}>Not Selected</MenuItem>
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
                value={newRow.price}
                name='price'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Payment Frequency</InputLabel>
              <Select
                label="Payment Frequency"
                value={newRow.payFreq}
                onChange={handleChange}
                name='payFreq'
              >
                <MenuItem value={null}>Not Selected</MenuItem>
                <MenuItem value="Per Week">Per Week</MenuItem>
                <MenuItem value="Per Month">Per Month</MenuItem>
                <MenuItem value="Per Year">Per Year</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            label="Lease Start"
            required
            placeholder='DD/MM/YYYY'
            name='available'
            value={newRow.available}
            onChange={handleChange}
          />
          <Typography>Facillities </Typography>
          <Stack direction='row' spacing={1}>
            <FormControl fullWidth >
              <InputLabel htmlFor="bedroom-select">Bedroom(s)</InputLabel>
              <Select
                label="Bedroom(s)"
                value={newRow.bedrooms}
                onChange={handleChange}
                name='bedrooms'
              >
                <MenuItem value="0">0</MenuItem>
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
                value={newRow.bathrooms}
                onChange={handleChange}
                name='bathrooms'
              >
                <MenuItem value="0">0</MenuItem>
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
                value={newRow.car_spaces}
                onChange={handleChange}
                name='car_spaces'
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6+">6+</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Button variant='contained' endIcon={<AddCircleOutlineIcon />} onClick={(e) => confirmPressed(e)} disabled={buttonDisabled}>Add</Button>
        </Stack>
      </Box>
    </Modal>
  )
}
