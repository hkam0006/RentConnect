import React, { useState } from 'react'
import { Modal, Fade, Typography, Box, Stack, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import useAddPreviousTenancy from '../../mutators/Previous Tenancy/useAddPreviousTenancy';
import { useSelector } from 'react-redux';
import useGetRenterEmploymentsByRenterID from '../../queries/Renter Employment/useGetRenterEmploymentsByRenterID';
import useAddRenterEmployer from '../../mutators/Renter Employer/useAddRenterEmployer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: "90vw",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddReferenceModal = ({onClose}) => {
  const renterId = useSelector(state => state.user.currentUser?.renter_id)
  const addPreviousTenancy = useAddPreviousTenancy()
  const addRenterEmployer = useAddRenterEmployer()
  const { renterEmployments: fetchedEmployments } = useGetRenterEmploymentsByRenterID(renterId)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    employer_id: ""
  })

  const [formError, setFormError] = useState({
    type: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    employer_id: ""
  })

  const validateForm = (name, value, blur) => {
    if (blur){
      if (value.length === 0){
        const message = "Field cannot be empty"
        setFormError((prev) => ({
          ...prev,
          [name]: message
        }))
      } else {
        setFormError((prev) => ({
          ...prev,
          [name]: ""
        }))
      }
    }
  }

  const handleFormChange = (e, blur) => {
    const {value, name} = e.target;
    validateForm(name, value, blur)
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitForm = () => {
    validateForm("name", formData.name, true)
    validateForm("email", formData.email, true)
    validateForm("phone", formData.phone, true)
    validateForm("type", formData.type, true)
    if (formData.type === 'rental'){
      validateForm("address", formData.address, true)
    }
    if (formData.type === 'employer'){
      validateForm("employer_id", formData.employer_id, true)
    }

    if (formData.type === 'rental'){
      // handle adding rental reference
      addPreviousTenancy(
        renterId,
        formData.address,
        formData.name,
        formData.phone,
        formData.email
      ).then(() => {
        onClose()
      }).catch(() => {
        setFormError((prev) => ({
          ...prev,
          phone: "Error adding rental reference"
        }))
      })
    } else if (formData.type === 'employer'){
      // handle adding employer reference
      addRenterEmployer(
        renterId,
        formData.employer_id,
        formData.name,
        formData.phone,
        formData.email
      ).then(() => {
        onClose()
      }).catch(() => {
        setFormError((prev) => ({
          ...prev,
          phone: "Error adding employer reference"
        }))
      })
    }
  }

  return (
    <Modal
      aria-labelledby="add-reference"
      aria-describedby="modal-for-adding-reference-information"
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
            <Typography variant='h5'>Add Reference</Typography>
            <IconButton sx={{borderRadius: 10}} onClick={onClose}>&times;</IconButton>
          </Stack>
          <Typography variant="p" component="p" gutterBottom>
            You must have this person’s consent to provide their personal information and be contacted by us during business hours.
          </Typography>
          <Stack spacing={2} mt={2}>
            <Stack>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.type}
                  name="type"
                  label='Type'
                  onChange={(e) => handleFormChange(e, true)}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="rental">Previous Tenancy</MenuItem>
                  <MenuItem value="employer">Employment</MenuItem>
                </Select>
              </FormControl>
              {Boolean(formError.type) && <Typography color='error'>{formError.type}</Typography>}
            </Stack>
            {formData.type === 'rental' && <Stack>
              <TextField 
                name='address'
                label='Address'
                value={formData.address}
                onChange={(e) => handleFormChange(e, false)}
                onBlur={(e) => handleFormChange(e, true)}
              />
              {Boolean(formError.address) && <Typography color='error'>{formError.address}</Typography>}
            </Stack>}
            {formData.type === 'employer' && <Stack>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Company</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.employer_id}
                    name="employer_id"
                    label='Employer'
                    onChange={(e) => handleFormChange(e, true)}
                  >
                    <MenuItem value=""></MenuItem>
                    {fetchedEmployments.map((employer) => {
                      return (
                        <MenuItem 
                          key={employer.renter_employment_id} 
                          value={employer.renter_employment_id}
                        >
                          {employer.renter_employment_location}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                {Boolean(formError.employer_id) && <Typography color='error'>{formError.employer_id}</Typography>}
              </Stack>}
            <Stack>
              <TextField 
                label='Name' 
                name='name' 
                onChange={(e) => handleFormChange(e, false)}
                onBlur={(e) => handleFormChange(e, true)}
              />
              {Boolean(formError.name) && <Typography color='error'>{formError.name}</Typography>}
            </Stack>
            <Stack>
              <TextField 
                label='Email' 
                name='email'  
                onChange={(e) => handleFormChange(e, false)}
                onBlur={(e) => handleFormChange(e, true)}
              />
              {Boolean(formError.email) && <Typography color='error'>{formError.email}</Typography>}
            </Stack>
            <Stack>
              <TextField 
                label='Phone'  
                name="phone"
                onChange={(e) => handleFormChange(e, false)}
                onBlur={(e) => handleFormChange(e, true)} 
              />
              {Boolean(formError.phone) && <Typography color='error'>{formError.phone}</Typography>}
            </Stack>
            <Stack direction='row' spacing={1} sx={{justifyContent: "flex-end"}}>
              <Button variant='outlined' color='error'>Cancel</Button>
              <Button variant='contained' onClick={handleSubmitForm}>Add</Button>
            </Stack>
          </Stack>
        </Box>  
      </Fade>
    </Modal>
  )
}

export default AddReferenceModal
