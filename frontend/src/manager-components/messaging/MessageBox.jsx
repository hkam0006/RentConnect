import React from 'react'
import { Paper, TextField, Button, Box } from '@mui/material'

function MessageBox({ message, setMessage, HandleMessagesPush }) {
    return (
        <Paper sx={{ padding: 2, margin: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    className='messageBox'
                    id='messageBox'
                    label='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    multiline
                    rows={1}
                    variant='outlined'
                    margin='dense'
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={HandleMessagesPush}
                >
                    Send
                </Button>
            </Box>
        </Paper>
    )
}

export default MessageBox
