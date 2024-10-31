import { Link, useParams } from 'react-router-dom'
import { List, ListItem, Typography, Paper, Box, Alert } from '@mui/material'

import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID'

function Outline() {
    const { renterId } = useParams()
    const {renter: fetchedRenter, loading} = useGetRenterByRenterID(renterId) 
    const renter = fetchedRenter[0]

    const goToSection = (section) => {
        const sectionElement = document.getElementById(section)

            if (!sectionElement) {
            console.error(`Section with id "${section}" not found.`)
            return
        }
    
        const contentPosition = sectionElement.getBoundingClientRect().top + window.scrollY - 110
        window.scrollTo({
            top: contentPosition,
            behavior: 'smooth'
        })
    }
    
    if (loading) {
        return <></>
    } else if (!renter) {
        return (
            <Paper sx={{ padding: 2, margin: 2, position: 'fixed', width: '20%', height: '83%' }}>
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No renter found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, margin: 2, position: 'fixed', width: '20%', height: '83%' }}>
                {renter && (
                    <Box>
                        <Typography variant='h6'>
                            <Link href="#" to={`/Rprofile/${renter.renter_id}`} color="inherit" underline="none" style={{ textDecoration: 'none' }}>
                                {renter?.renter_first_name} {renter?.renter_last_name}
                            </Link>
                        </Typography>
                        <List>
                            <ListItem variant='h6'>Primary Applicant</ListItem>
                            <ListItem variant='h6'>Phone: {renter.renter_phone_number}</ListItem>
                            <ListItem variant='h6'>Email: {renter.renter_email}</ListItem>
                        </List>
                    </Box>
                )}
                <Box>
                    <Typography variant='h6'>Outline</Typography>
                    <List>
                        <ListItem onClick={() => goToSection('Preferences')}>Preferences</ListItem>
                        <ListItem onClick={() => goToSection('Address History')}>Address History</ListItem>
                        <ListItem onClick={() => goToSection('Employment History')}>Employment History</ListItem>
                        <ListItem onClick={() => goToSection('Income')}>Income</ListItem>
                        <ListItem onClick={() => goToSection('Identity')}>Identity</ListItem>
                        <ListItem onClick={() => goToSection('Pets')}>Pets</ListItem>
                    </List>
                </Box>
            </Paper>
        )
    }
}

export default Outline