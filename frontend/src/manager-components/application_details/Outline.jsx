import React from 'react'
import { List, ListItem, Typography, Paper, Box } from '@mui/material'

function Outline({ renter }) {
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
    

    const result = (
        <Paper sx={{ padding: 2, margin: 2, position: 'fixed', width: '20%', height: '83%' }}>
            {renter && (
                <Box>
                    <Typography variant='h6'>{renter.renter_first_name} {renter.renter_last_name}</Typography>
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
    
    return result
}

export default Outline