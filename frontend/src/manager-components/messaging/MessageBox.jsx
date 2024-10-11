import React from 'react'
import { Paper, TextField, Button, Box } from '@mui/material'

function MessageBox({ message, setMessage, HandleMessagesPush }) {
    function handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            HandleMessagesPush()
        }
    }

    return (
        <Paper sx={{ padding: 2, margin: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    className='messageBox'
                    id='messageBox'
                    label='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
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
