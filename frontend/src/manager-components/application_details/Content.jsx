import React from 'react'
import { Box } from '@mui/material'

import Preferences from './Content/Preferences'
import AddressHistory from './Content/AddressHistory'
import EmploymentHistory from './Content/EmploymentHistory'
import Identity from './Content/Identity'
import Pets from './Content/Pets'

function Content({ handleCommentsClick }) {
    return (
        <Box sx={{ padding: 2 }}>
            <Preferences handleCommentsClick={handleCommentsClick} />
            <AddressHistory handleCommentsClick={handleCommentsClick}/>
            <EmploymentHistory handleCommentsClick={handleCommentsClick}/>
            <Identity handleCommentsClick={handleCommentsClick}/>
            <Pets handleCommentsClick={handleCommentsClick}/>
        </Box>
    )
}

export default Content
