import { supabase } from "../../supabase";
import { Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react'

const TEST_PROPERTY_MANAGER_ID = "fc8e3cf4-cbbc-4557-b303-7aa028c616eb";
const TEST_COMPANY_ID = "1b9500a6-ac39-4c6a-971f-766f85b41d78"

const AddKeyModal = ({ OnClose, properties, propManagers }) => {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [newKey, setNewKey] = useState({
    property_id: null,
    property_manager_id: TEST_PROPERTY_MANAGER_ID,
    key_set: null
  })

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


  const handleChange = e => {
    const { name, value } = e.target;
    setNewKey(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  async function addRowToTable() {
    const { data, error } = await supabase
      .from('KEY')
      .insert([
        {
          property_id: newKey.property_id,
          company_id: TEST_COMPANY_ID,
          key_status: "Added",
          key_set: newKey.key_set,
          property_manager_id: newKey.property_manager_id,
        },
      ])

    if (error) {
      console.error("Error Inserting row:", error)
    }
    else {
      console.log('Row Added')
    }
  }

  const handleSubmit = async e => {
    await addRowToTable();
    OnClose(e);
  }

  return (
    <Modal
      aria-labelledby="add-key-modal-title"
      aria-describedby="add-key-modal-description"
      open={true}
      onClose={OnClose}
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
          <Typography id="modal-title" variant="h5" component="h2">
            Add Key
          </Typography>
          <Stack direction='column' mt={2} spacing={2}>
            <FormControl>
              <InputLabel id="property-manager-select-label">Property Manager</InputLabel>
              <Select
                required
                label="Property Manager"
                id="property-manager-select"
                onChange={handleChange}
                name='property_id'
              >
                {propManagers.map((p, index) => (
                  <MenuItem key={index} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="property-manager-select-label">Property Address</InputLabel>
              <Select
                required
                label="Property Address"
                id="property-address-select"
                onChange={(e) => setNewKey(prev => ({ ...prev, property_id: e.target.value }))}
                name='property_id'
              >
                {properties.map((p, index) => (
                  <MenuItem key={index} value={p.property_id}>
                    {p.property_street_number} {p.property_street_name} {p.property_street_type}, {p.property_suburb}, {p.property_state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label='Key Set' required name='key_set' value={newKey.key_set} onChange={handleChange} />
            <Button
              variant='contained'
              disabled={!newKey.property_manager_id || !newKey.property_id || !newKey.key_set}
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}

export default AddKeyModal
