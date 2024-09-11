import { useState } from 'react'
import { Box, Typography, Grid, Button, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EmploymentHistoryDialog from '../Dialogs/EmploymentHistoryDialog'

function EmploymentHistoryCard({ initialEmployment }) {
    const [employment, setEmployment] = useState(initialEmployment)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function updateEmployment(newEmployment) {
        setEmployment(newEmployment)
    }

    function calculateTenure(startDate, endDate) {
        const start = new Date(startDate)
        const end = endDate ? new Date(endDate) : new Date()

        const yearsDifference = end.getFullYear() - start.getFullYear()
        let monthsDifference = end.getMonth() - start.getMonth()

        if (monthsDifference < 0) {
            monthsDifference += 12
        }

        return `${yearsDifference} years, ${monthsDifference} months`
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <>
            <Box>
                <Box paddingBottom={2}>
                    <Divider/>
                </Box>
                <Grid container alignItems='center'>
                    <Grid item xs={10}>
                        <Typography variant='h6'>{employment.renter_employment_title} at {employment.renter_employment_location}</Typography>
                        <Grid container alignItems='center' paddingTop={1}>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Type</Typography>
                                <Typography variant='body1'>{employment.renter_employment_type}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Gross Income</Typography>
                                <Typography variant='body1'>${employment.renter_employment_gross_income} p/a</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Net Income</Typography>
                                <Typography variant='body1'>${Math.round(employment.renter_employment_net_income/12)} p/w</Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' paddingTop={1}>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Tenure</Typography>
                                <Typography variant='body1'>
                                    {calculateTenure(employment.renter_employment_start, employment.renter_employment_end)}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Start Date</Typography>
                                <Typography variant='body1'>{formatDate(employment.renter_employment_start)}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>End Date</Typography>
                                <Typography variant='body1'>{employment.renter_employment_end ? formatDate(employment.renter_employment_end) : 'Currently Present'}</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='body1' color='text.secondary' paddingTop={1}>Contact</Typography>
                        <Typography variant='body1'>Employer Name: {employment.employer_name}</Typography>
                        <Typography variant='body1'>Employer Phone: {employment.employer_phone ? employment.employer_phone : 'None provided'}</Typography>
                        <Typography variant='body1'>Employer Email: {employment.employer_email ? employment.employer_email : 'None provided'}</Typography>
                    </Grid>
                    <Grid item xs={2} container justifyContent='flex-end'>
                        <Button variant='contained' color='primary' onClick={() => setIsDialogOpen(true)}>
                            <EditIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {isDialogOpen && <EmploymentHistoryDialog employment={employment} closeDialog={closeDialog} updateEmployment={updateEmployment} isUpdate={true}/>}
        </>
    )
}

export default EmploymentHistoryCard