import { useParams } from 'react-router-dom'
import { Paper, Alert } from '@mui/material'

import useGetRenterEmploymentsByRenterID from '../../../queries/Renter Employment/useGetRenterEmploymentsByRenterID'

import ContentTitle from './ContentTitle'
import EmploymentHistoryCard from './EmploymentHistoryContent/EmploymentHistoryCard'

function EmploymentHistory({ handleCommentsClick }) {
    const { renterId } = useParams()
    const { renterEmployments, loading } = useGetRenterEmploymentsByRenterID(renterId)

    if (loading) {
        return <></>
    } else if (!renterEmployments || renterEmployments.length === 0) {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='EmploymentHistoryPaper'>
                <ContentTitle content={'Employment History'} handleCommentsClick={handleCommentsClick} />
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No employment history found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='EmploymentHistoryPaper'>
                <ContentTitle content={'Employment History'} handleCommentsClick={handleCommentsClick} />
                {renterEmployments.map((employment, index) =>
                    <EmploymentHistoryCard key={`employmentHistory-${index}`} employment={employment} />
                )}
            </Paper>
        )
    }
}

export default EmploymentHistory