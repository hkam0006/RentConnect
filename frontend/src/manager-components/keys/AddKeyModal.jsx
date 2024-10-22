import { supabase } from "../../supabase";
import { Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useSelector } from "react-redux";

const AddKeyModal = ({ OnClose, properties, propManagers, keySetList }) => {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [newKey, setNewKey] = useState({
    property_id: null,
    property_manager_id: null,
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

  const company_id = useSelector((state) => state.user.currentUser.company_id)

  const [keySetError, setKeySetError] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target;
    const keySetExists = Boolean(keySetList.find((keyset) => keyset === value))
    if (name === "key_set" ){
      if (keySetExists){
        setKeySetError("Key set already exists. Try another key set")
      } else {
        setKeySetError(null)
      }
    }
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
          company_id: company_id,
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
                name='property_manager_id'
              >
                {propManagers.map((p, index) => (
                  <MenuItem key={index} value={p.property_manager_id}>
                    {p.property_manager_first_name} {p.property_manager_last_name}
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
            <FormControl>
              <TextField label='Key Set' required name='key_set' value={newKey.key_set} onChange={handleChange} />
              <Box sx={{color: 'error.main', display: Boolean(keySetError) ? "show" : "none"}} >{keySetError}</Box>
            </FormControl>
            <Button
              variant='contained'
              disabled={!newKey.property_manager_id || !newKey.property_id || !newKey.key_set || Boolean(keySetError)}
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
