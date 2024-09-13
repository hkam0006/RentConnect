import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Button } from '@mui/material'
import AccountDetailsDialog from './Dialogs/AccountDetailsDialog'
import useGetOnlyRenterByRenterID from '../../../queries/Renter/useGetOnlyRenterByRenterID'
import useSubscribeTableByRenterID from '../../../subscribers/useSubscribeTableByRenterID'

function AccountDetails({ userID }) {
    const [renter, setRenter] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const fetchedRenter = useGetOnlyRenterByRenterID(userID)[0]
    useEffect(() => {
        setRenter(fetchedRenter)
    }, [fetchedRenter])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    const updateRenter = useCallback((payload) => {
        const newRenter = payload.new
        setRenter(newRenter)
    }, [setRenter])
    useSubscribeTableByRenterID('RENTER', userID, updateRenter)

    return (
        <>
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>
                    Account
                </Typography>
                {renter && (
                    <>
                        <Typography>
                            {renter.renter_first_name} {renter.renter_last_name}
                        </Typography>
                        <Typography>
                            {renter.renter_email}
                        </Typography>
                        <Typography>
                            {renter.renter_phone_number}
                        </Typography>
                    </>
                )}
                <Button onClick={() => setIsDialogOpen(true)}>
                    Update Details
                </Button>
                <Button>
                    Update Password
                </Button>
            </Paper>
            {isDialogOpen && <AccountDetailsDialog renter={renter} closeDialog={closeDialog}/>}
        </>
    )
}

export default AccountDetails