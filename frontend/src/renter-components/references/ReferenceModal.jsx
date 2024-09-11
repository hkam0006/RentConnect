import { Box, Fade, FormControl, InputLabel, Stack, Typography, Modal, TextField, Select, MenuItem } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import React from 'react'

const ReferenceModal = ({onClose}) => {
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
          <Typography variant='h5'>Edit Reference</Typography>
          <Stack spacing={2} mt={2}>
            <FormControl>
              <TextField label='Name'/>
            </FormControl>
            <FormControl>
              <InputLabel>Reference Type</InputLabel>
              <Select
                required
                label="reference-type"
                id="reference-type-select"
                // name='property_id'
              >
                <MenuItem>Current Employer</MenuItem>
                <MenuItem>Previous Employer</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField label='Email'/>
            </FormControl>
            <FormControl>
              <TextField label='Phone'/>
            </FormControl>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ReferenceModal
