import { Paper, Typography, Button } from '@mui/material'

import useGetRenterByRenterID from '../../../queries/Renter/useGetRenterByRenterID'

function AccountDetails({ userID }) {
    const renter = useGetRenterByRenterID(userID)[0] || null

    return (
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
            <Button>
                Update Details
            </Button>
            <Button>
                Update Password
            </Button>
        </Paper>
    )
}

export default AccountDetails