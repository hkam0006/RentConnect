import React from 'react'
import { Paper, TextField, Box } from '@mui/material'

function SearchBox({ searchedName, handleNameSearch }) {
    return (
        <Paper sx={{ padding: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    className='searchBox'
                    id='searchBox'
                    label='search'
                    value={searchedName}
                    onChange={(e) => handleNameSearch(e.target.value)}
                    fullWidth
                    multiline
                    rows={1}
                    variant='outlined'
                    margin='dense'
                    sx={{ marginRight: 2 }}
                />
            </Box>
        </Paper>
    )
}

export default SearchBox
