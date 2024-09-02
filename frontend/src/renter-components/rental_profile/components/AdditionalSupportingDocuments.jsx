import { Paper, Typography, Box } from '@mui/material'
import Pets from './additional supporting documents/Pets'

function AdditionalSupportingDocuments({ userID }) {
    return (
        <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
            <Typography variant='h4'>
                Additional Supporting Documents
            </Typography>
            {userID && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Pets userID={userID} />
                </Box>
            )}
        </Paper>
    )
}

export default AdditionalSupportingDocuments