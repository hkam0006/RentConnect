import React from 'react'
import { Typography } from '@mui/material'

function Payslips({ statement }) {
    return (
        <Typography variant='body1'>There are {statement.length} statement(s) here and I do not know how they should be layed out.</Typography>
    )
}

export default Payslips