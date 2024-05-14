import React from 'react'
import { Typography, Grid, Button, Box } from '@mui/material'
import { Chat, Check, Close } from '@mui/icons-material'

function ContentTitle({ content, verified, handleVerification, handleCommentsClick }) {
    return (
        <Grid container alignItems='center'>
            <Grid item xs={6}>
                <Typography variant='h4' id={content}>{content}</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent='flex-end'>
                <Box>
                    <Button variant='contained' color='primary' disabled={verified} style={{ backgroundColor: verified ? 'green' : 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification(content, true)}>
                        <Check />
                    </Button>
                    <Button variant='contained' color='primary' disabled={!verified} style={{ backgroundColor: verified ? 'grey' : 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification(content, false)}>
                        <Close />
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => handleCommentsClick(content)}>
                        <Chat />
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContentTitle