
import { Paper, Typography, Box } from '@mui/material'
import AddressHistory from './essentials/AddressHistory'
import EmploymentHistory from './essentials/EmploymentHistory'
import Identity from './essentials/Identity'

function Essentials({ userID }) {
    return (
        <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
            <Typography variant='h4'>
                Essentials
            </Typography>
            {userID && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <AddressHistory userID={userID} />
                    <EmploymentHistory userID={userID} />
                    <Identity userID={userID} />
                </Box>
            )}
        </Paper>
    )
}

export default Essentials