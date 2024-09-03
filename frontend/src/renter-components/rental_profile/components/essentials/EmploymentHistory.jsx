import { Paper } from '@mui/material'
import useGetRenterEmploymentsByRenterID from '../../../../queries/Renter Employment/useGetRenterEmploymentsByRenterID'
import EmploymentHistoryCard from './EmploymentHistoryCard'
import ContentTitle from './ContentTitle'

function EmploymentHistory({ userID }) {
    const employmentHistories = useGetRenterEmploymentsByRenterID(userID)
    function addEmploymentHistory() {
        console.log('lets add an employment history')
    }

    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ContentTitle title={'Employment History'} addOnClick={addEmploymentHistory} />
            {employmentHistories && (
                employmentHistories.map(employment => (
                    <EmploymentHistoryCard key={employment.id} employment={employment} />
                ))
            )}
        </Paper>
    )
}

export default EmploymentHistory