import { Paper, Typography, FormControlLabel, Checkbox, Box } from '@mui/material'

function Preferences() {
    return (
        <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
            <Typography variant='h4' gutterBottom>
                Preferences
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>
                    Send me property matches to my inbox (doesn't do anything)
                </Typography>
                <FormControlLabel
                    control={<Checkbox />}
                    label=""
                />
            </Box>
        </Paper>
    )
}

export default Preferences