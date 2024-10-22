import { supabase } from "../../supabase";
import { Box, Button, Fade, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useUpdateKeyStatus from "../../mutators/Keys/useUpdateKeyStatus";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: "95%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CheckoutModal = ({ onClose, keyObject }) => {
  const {checkOutKey} = useUpdateKeyStatus();
  const [dueDate, setDueDate] = useState(dayjs().add(1, 'day'));
  const [issueDate, setIssueDate] = useState(dayjs());
  const [borrower, setBorrower] = useState("");

  const handleSubmit = async e => {
    const {data, error} = await checkOutKey(keyObject.key_id, dueDate, issueDate, borrower);
    console.log(error)
    onClose(e)
  }


  return (
    <Modal open={true} onClose={onClose}>
      <Fade in={true}>
        <Box sx={style} >
          <Typography variant='h5' >Check Out Key</Typography>
          <Stack mt={2}>
            <Typography variant='caption1' fontWeight={700}>Key Information</Typography>
          </Stack>
          <Stack direction='column' mb={2}>
            <Typography> Manager: {keyObject.manager_name}</Typography>
            <Typography>Address: {keyObject.prop_add}</Typography>
            <Typography>Key Set: {keyObject.key_set}</Typography>
          </Stack>
          <Typography variant='caption1' fontWeight={700}>Checkout Information</Typography>
          <Stack direction='column' spacing={2} mt={1}>
            <TextField label="Borrower" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Issue Date"
                  value={issueDate}
                  onChange={(newValue) => setIssueDate(newValue)}
                />
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                />
            </LocalizationProvider>
            <Button
              variant='contained'
              disabled={dueDate.diff(issueDate) < 0 || !borrower}
              onClick={(e) => handleSubmit(e)}
            >
              Check Out
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CheckoutModal
