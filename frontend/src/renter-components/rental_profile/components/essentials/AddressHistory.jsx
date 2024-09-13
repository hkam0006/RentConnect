import { useState, useEffect, useCallback } from 'react'
import { Paper } from '@mui/material'
import useGetPreviousTenanciesByRenterID from '../../../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID'
import PreviousTenancyCard from './AddressHistoryCard'
import ContentTitle from './ContentTitle'
import AddressHistoryDialog from '../Dialogs/AddressHistoryDialog'
import useSubscribeTableByRenterID from '../../../../subscribers/useSubscribeTableByRenterID'

function AddressHistory({ userID }) {
    const [previousTenancies, setPreviousTenancies] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    const fetchedPreviousTenancies = useGetPreviousTenanciesByRenterID(userID)
    useEffect(() => {
        setPreviousTenancies(fetchedPreviousTenancies)
    }, [fetchedPreviousTenancies])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addAddressHistoryButton() {
        setIsDialogOpen(true)
    }

    const updateAddressHistory = useCallback((payload) => {
        switch (payload.eventType) {
            case 'INSERT':
                setPreviousTenancies([...previousTenancies, payload.new])
                break
            case 'UPDATE':
                const updatedTenancies = previousTenancies.map((tenancy) => {
                    if (tenancy.previous_tenancy_id === payload.new.previous_tenancy_id) {
                        return payload.new
                    }
                    return tenancy
                })
                setPreviousTenancies(updatedTenancies)
                break
            case 'DELETE':
                const filteredTenancies = previousTenancies.filter((tenancy) => tenancy.previous_tenancy_id !== payload.old.previous_tenancy_id)
                setPreviousTenancies(filteredTenancies)
                break
            default:
                break
        }
    }, [previousTenancies, setPreviousTenancies])
    useSubscribeTableByRenterID('PREVIOUS-TENANCY', userID, updateAddressHistory)
    
    return (
        <>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ContentTitle title={'Address History'} addOnClick={addAddressHistoryButton} />
                {previousTenancies && (
                    previousTenancies.map((previousTenancy, index) => (
                        <PreviousTenancyCard key={index} previousTenancy={previousTenancy} />
                    ))
                )}
            </Paper>
            {isDialogOpen && <AddressHistoryDialog addressHistory={{renter_id: userID}} closeDialog={closeDialog} isUpdate={false}/>}
        </>
    )
}

export default AddressHistory
