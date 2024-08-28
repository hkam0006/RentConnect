import React from 'react'
import { Paper } from '@mui/material'

import ContentTitle from './ContentTitle'
import EmploymentHistoryCard from './EmploymentHistoryContent/EmploymentHistoryCard'

function EmploymentHistory({ renterEmployment, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='EmploymentHistoryPaper'>
            <ContentTitle 
                content={'Employment History'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
            {renterEmployment.map((employment, index) =>
                <EmploymentHistoryCard key={`employmentHistory-${index}`} employment={employment} />
            )}
        </Paper>
    )
}

export default EmploymentHistory