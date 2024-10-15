import { useState, useCallback } from 'react'
import { Paper } from '@mui/material'
import useGetRenterEmploymentsByRenterID from '../../../../queries/Renter Employment/useGetRenterEmploymentsByRenterID'
import EmploymentHistoryCard from './EmploymentHistoryCard'
import ContentTitle from './ContentTitle'
import EmploymentHistoryDialog from '../Dialogs/EmploymentHistoryDialog'
import useSubscribeTableByRenterID from '../../../../subscribers/useSubscribeTableByRenterID'

function EmploymentHistory({ userID }) {
    const { renterEmployments, setRenterEmployments } = useGetRenterEmploymentsByRenterID(userID)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addButton() {
        setIsDialogOpen(true)
    }

    const updateEmploymentHistory = useCallback((payload) => {
        let updatedEmployments
    
        switch (payload.eventType) {
            case 'INSERT':
                updatedEmployments = [...renterEmployments, payload.new]
                break
            case 'UPDATE':
                updatedEmployments = renterEmployments.map((employment) => 
                    employment.renter_employment_id === payload.new.renter_employment_id
                        ? payload.new
                        : employment
                )
                break
            case 'DELETE':
                updatedEmployments = renterEmployments.filter(
                    (employment) => employment.renter_employment_id !== payload.old.renter_employment_id
                )
                break
            default:
                updatedEmployments = [...renterEmployments]
                break
        }
    
        const sortedEmployments = updatedEmployments.sort((a, b) => {
            if (a.renter_employment_end === null) return -1
            if (b.renter_employment_end === null) return 1
            if (a.renter_employment_end !== b.renter_employment_end) {
                return new Date(a.renter_employment_end) - new Date(b.renter_employment_end)
            }
    
            if (a.renter_employment_end !== b.renter_employment_end) {
                return new Date(b.renter_employment_end) - new Date(a.renter_employment_end)
            }
    
            return new Date(b.renter_employment_start) - new Date(a.renter_employment_start)
        })
    
        setRenterEmployments(sortedEmployments)
    }, [renterEmployments, setRenterEmployments])
    useSubscribeTableByRenterID('RENTER-EMPLOYMENT', userID, updateEmploymentHistory)

    if (!renterEmployments) {
        return <></>
    } else {
        return (
            <>
                <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ContentTitle title={'Employment History'} addOnClick={addButton} />
                    {renterEmployments && (
                        renterEmployments.map((employment, index) => (
                            <EmploymentHistoryCard key={index} employment={employment} />
                        ))
                    )}
                </Paper>
                {isDialogOpen && <EmploymentHistoryDialog employment={{renter_id: userID}} closeDialog={closeDialog} isUpdate={false}/>}
            </>
        )
    }
}

export default EmploymentHistory