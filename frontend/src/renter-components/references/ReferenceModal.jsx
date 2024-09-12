import { Box, Fade, FormControl, InputLabel, Stack, Typography, Modal, TextField, Select, MenuItem, Button, IconButton } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import React, { useState } from 'react'
import useUpdatePreviousTenancy from '../../mutators/Previous Tenancy/useUpdatePreviousTenancyByID';
import useUpdateRenterEmployer from '../../mutators/Renter Employer/useUpdateRenterEmployerByID';

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

const disabled_text_sx = {
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },
}

const isNumericWithSigns = (str) => {
  return /^[0-9+-]+$/.test(str)
}

const ReferenceModal = ({onClose, reference}) => {
  const updatePreviousTenancyDB = useUpdatePreviousTenancy()
  const updateRenterEmployer = useUpdateRenterEmployer()
  const isRental = reference.type === "rental"
  const initialObject = (isRental) => {
    if (isRental) {
      return {
        name: reference.previous_tenancy_contact_name,
        email: reference.previous_tenancy_contact_email,
        phone: reference.previous_tenancy_contact_phone,
        address: reference.previous_tenancy_address,
        previous_tenancy_id: reference.previous_tenancy_id,
        renter_id: reference.renter_id,
        type: reference.type
      }
    } 
    return {
      name: reference.renter_employer_name,
      email: reference.renter_employer_email,
      phone: reference.renter_employer_phone_number,
      employer_id: reference.renter_employer_id,
      renter_id: reference.renter_id,
      type: reference.type
    }
  }
  const unchangedReference = initialObject(isRental)
  const [information, setInformation] = useState(initialObject(isRental))
  const noErrorObject = {
    name: null,
    email: null,
    phone: null,
    address: null,
  }
  const [errorInformation, setErrorInformation] = useState(noErrorObject)
  const [editMode, setEditMode] = useState(false)

  const validateForm = (name, value, blur) => {
    if (blur){
      if (name === "email"){
        if (value.length <= 0 ){
          setErrorInformation((prev) => ({
            ...prev,
            email: "Email field cannot be empty"
          }))
        } else {
          setErrorInformation((prev) => ({
            ...prev,
            email: null
          }))
        }
      }
      if (name === 'phone'){
        if ( value.length === 0 || !isNumericWithSigns(value)){
          setErrorInformation((prev) => ({
            ...prev,
            phone: "Phone field cannot be empty and must be valid"
          }))
        } else {
          setErrorInformation((prev) => ({
            ...prev,
            phone: null
          }))
        }
      }
      if (name === 'name'){
        if (value.length === 0){
          setErrorInformation((prev) => ({
            ...prev,
            name: "Name field cannot be empty"
          }))
        } else {
          setErrorInformation((prev) => ({
            ...prev,
            name: null
          }))
        }
      }
      if (name === 'address'){
        if (value.length === 0){
          setErrorInformation((prev) => ({
            ...prev,
            address: "Address field cannot be empty"
          }))
        } else {
          setErrorInformation((prev) => ({
            ...prev,
            address: null
          }))
        }
      }
    }
  }


  const handleFormChange = (e, blur) => {
    const {name, value} = e.target
    validateForm(name, value, blur)
    setInformation((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCancelChanges = () => {
    setInformation(unchangedReference)
    setErrorInformation(noErrorObject)
    setEditMode(false)
  }

  const handleSaveChanges = () => {
    if (!editMode){
      setEditMode(true)
      return
    }
    validateForm("email", information.email, true)
    validateForm("name", information.name, true)
    validateForm("phone", information.phone, true)

    if (information.type === "rental"){
      updatePreviousTenancyDB(
        reference.previous_tenancy_id, 
        reference.renter_id, 
        information.address, 
        information.name, 
        information.email, 
        information.phone
      ).then(() => {
        setErrorInformation(noErrorObject)
        setEditMode(false)
      }).catch(() => {
        setErrorInformation((prev) => ({
          ...prev,
          'phone': "Failed to update reference."
        }))
      })
    } else {
      updateRenterEmployer(
        reference.renter_id,
        reference.renter_employer_id,
        {
          name: information.name,
          address: information.address,
          phone: information.phone
        }
      ).then(() => {
        setErrorInformation(noErrorObject)
        setEditMode(false)
      }).catch(() => {
        setErrorInformation((prev) => ({
          ...prev,
          'phone': "Failed to update reference."
        }))
      })
    }
  }

  return (
    <Modal
      aria-labelledby="edit-reference"
      aria-describedby="modal-for-changing-reference-information"
      open={true}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between' >
            <Typography variant='h5'>Edit Reference</Typography>
            <IconButton onClick={onClose}>&times;</IconButton>
          </Stack>
          <Stack spacing={2} mt={2}>
          <Stack sx={{display: !information.hasOwnProperty("address") ? 'none' : "show",}}>
              <TextField 
                onChange={(e) => handleFormChange(e, false)} 
                onBlur={(e) => handleFormChange(e, true)}  
                disabled={!editMode} 
                label="Address" 
                name='address' 
                id="address" 
                value={information.address} 
                sx={disabled_text_sx}
              />
              <Box sx={{display: Boolean(errorInformation.address) ? "show" : "hidden" }} ><Typography color="error">{errorInformation.address}</Typography></Box>
            </Stack>
            <Stack>
              <TextField 
                onChange={(e) => handleFormChange(e, false)} 
                onBlur={(e) => handleFormChange(e, true)}  
                disabled={!editMode} 
                label="Name" 
                name='name' 
                id="name" 
                value={information.name} 
                sx={disabled_text_sx}
              />
              <Box sx={{display: Boolean(errorInformation.name) ? "show" : "hidden" }} ><Typography color="error">{errorInformation.name}</Typography></Box>
            </Stack>
            <Stack>
              <TextField 
                onChange={(e) => handleFormChange(e, false)} 
                onBlur={(e) => handleFormChange(e, true)}  
                disabled={!editMode} 
                label='Email' 
                name='email' 
                id="email"  
                sx={disabled_text_sx} 
                value={information.email}
              />
              <Box sx={{display: Boolean(errorInformation.email) ? "show" : "hidden" }} ><Typography color="error">{errorInformation.email}</Typography></Box>
            </Stack>
            <Stack>
              <TextField 
              onChange={(e) => handleFormChange(e, false)} 
              onBlur={(e) => handleFormChange(e, true)}  
              disabled={!editMode} 
              label='Phone' 
              name='phone' 
              id="phone" 
              sx={disabled_text_sx} 
              value={information.phone}
            />
              <Box sx={{display: Boolean(errorInformation.email) ? "show" : "hidden" }} ><Typography color="error">{errorInformation.phone}</Typography></Box>
            </Stack>
            <Stack direction={'row'} spacing={2} sx={{justifyContent: "space-between"}}>
              <Button 
                variant='contained' 
                color={editMode ? 'success' : "primary"} 
                onClick={handleSaveChanges}
                disabled={Boolean(errorInformation.email) || Boolean(errorInformation.name) || Boolean(errorInformation.phone || Boolean(errorInformation.address))}
              >
                {editMode ? "Save" : "Edit"}
              </Button>
              <Button variant='outlined' disabled={!editMode} onClick={handleCancelChanges} color='error'>Cancel</Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ReferenceModal
