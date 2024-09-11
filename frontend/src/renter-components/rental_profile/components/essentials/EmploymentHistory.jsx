import { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import useGetRenterEmploymentsByRenterID from '../../../../queries/Renter Employment/useGetRenterEmploymentsByRenterID'
import EmploymentHistoryCard from './EmploymentHistoryCard'
import ContentTitle from './ContentTitle'
import EmploymentHistoryDialog from '../Dialogs/EmploymentHistoryDialog'

function EmploymentHistory({ userID }) {
    const [employmentHistories, setEmploymentHistories] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const fetchedEmploymentHistories = useGetRenterEmploymentsByRenterID(userID)
    useEffect(() => {
        setEmploymentHistories(fetchedEmploymentHistories)
    }, [fetchedEmploymentHistories])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addButton() {
        setIsDialogOpen(true)
    }

    function addEmploymentHistory(newEmployment) {
        // Append the new employment history
        fetchedEmploymentHistories.push(newEmployment);
    
        // Sort the array according to the desired rules
        fetchedEmploymentHistories.sort((a, b) => {
            // Sort by "renter_employment_end" with ascending order, nulls first
            if (a.renter_employment_end === null && b.renter_employment_end !== null) return -1;
            if (a.renter_employment_end !== null && b.renter_employment_end === null) return 1;
            if (a.renter_employment_end !== b.renter_employment_end) {
                return new Date(a.renter_employment_end) - new Date(b.renter_employment_end);
            }
    
            // Sort by "renter_employment_end" in descending order (if the first condition didn't fully apply)
            if (a.renter_employment_end !== b.renter_employment_end) {
                return new Date(b.renter_employment_end) - new Date(a.renter_employment_end);
            }
    
            // Sort by "renter_employment_start" in descending order (if the previous conditions are tied)
            return new Date(b.renter_employment_start) - new Date(a.renter_employment_start);
        });
    }

    return (
        <>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ContentTitle title={'Employment History'} addOnClick={addButton} />
                {employmentHistories && (
                    employmentHistories.map((employment, index) => (
                        <EmploymentHistoryCard key={index} initialEmployment={employment} />
                    ))
                )}
            </Paper>
            {isDialogOpen && <EmploymentHistoryDialog employment={{renter_id: userID}} closeDialog={closeDialog} updateEmployment={addEmploymentHistory} isUpdate={false}/>}
        </>
    )
}

export default EmploymentHistory