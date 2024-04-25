import React from 'react'
import { Grid, TextField } from "@mui/material"


export function PropertySearch() {
  return (
    <Grid container spacing={2} sx={{ mt: "2px" }}>
      <Grid xs={12} sm={4} item >
        <TextField fullWidth size="small" placeholder='Search Property Address' variant='standard'></TextField>
      </Grid>
      <Grid xs={12} sm={4} item >
        <TextField fullWidth size="small" placeholder='Search Property Manager' variant='standard'></TextField>
      </Grid>
      <Grid xs={12} sm={4} item >
        <TextField fullWidth size="small" placeholder='Filter by Application Status' variant='standard'></TextField>
      </Grid>
    </Grid>
  )
}
