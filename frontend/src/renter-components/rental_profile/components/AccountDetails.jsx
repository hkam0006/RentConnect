import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Button } from '@mui/material'
import AccountDetailsDialog from './Dialogs/AccountDetailsDialog'
import useGetRenterByRenterID from '../../../queries/Renter/useGetRenterByRenterID'
import useSubscribeTableByRenterID from '../../../subscribers/useSubscribeTableByRenterID'
import AppLoader from '../../../manager-components/property_page/AppLoader'

function AccountDetails({ userID }) {
    const [renter, setRenter] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { renter: fetchedRenter } = useGetRenterByRenterID(userID)
    useEffect(() => {
        console.log(fetchedRenter)
        if (fetchedRenter && fetchedRenter.length > 0) {
            setRenter(fetchedRenter[0])
        }
    }, [fetchedRenter])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    const updateRenter = useCallback((payload) => {
        const newRenter = payload.new
        setRenter(newRenter)
    }, [setRenter])
    useSubscribeTableByRenterID('RENTER', userID, updateRenter)
    
    if (!renter) {
        return <></>
    } else {
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
}

export default AccountDetails