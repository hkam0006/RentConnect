import { useState, useEffect } from 'react'
import { supabase } from "../../supabase"

import { Typography, Grid, Paper, Button, Box } from '@mui/material'
import { LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import NavigationMenu from '../navigation_menu/NavigationMenus'
import ApplicationCard from './ApplicationCard'

import useCheckRenterAddressHistoryByRenterID from '../../queries/Previous Tenancy/useCheckRenterAddressHistoryByRenterID'
import useCheckRenterEmploymentByRenterID from '../../queries/Renter Employment/useCheckRenterEmploymentByRenterID'
import useCheckRenterSupportingDocumentsByRenterID from '../../queries/Application Supporting Document/useCheckRenterSupportingDocumentsByRenterID'

import useGetApplicationsByRenterID from '../../queries/Application/useGetApplicationsByRenterID'

function RentalProfile () {
    const navigate = useNavigate()

    const [userID, setUserID] = useState(null)
    const hasAddressHistory = useCheckRenterAddressHistoryByRenterID(userID)
    const hasEmployment = useCheckRenterEmploymentByRenterID(userID)
    const hasSupportingDocuments = useCheckRenterSupportingDocumentsByRenterID(userID)
    const [profileCompletionScore, setProfileCompletionScore] = useState(25)

    const {appliedProperties, loading} = useGetApplicationsByRenterID(userID)

    useEffect(() => {
        // TODO: set this back to getting user id when login is working
        async function getUserID() {
          const { data, error } = await supabase.auth.getUser()
          if (error) {
            console.error('Error getting user:', error)
          }
          if (data?.user) {
            //setUserID(data.user.id)
          }
        }
        getUserID()
        setUserID('c779fb8e-674f-46da-ba91-47cc5f2f269d')
    }, [])
    
    useEffect(() => {
        let score = 25
        if (hasAddressHistory) {
            score += 25
        }
        if (hasEmployment) {
            score += 25
        }
        if (hasSupportingDocuments) {
            score += 25
        }
        setProfileCompletionScore(score)
    }, [hasAddressHistory, hasEmployment, hasSupportingDocuments])

    const ProfileCompletion = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>Your Rental Profile</Typography>
                <Grid container alignItems='center' paddingTop={2}>
                    <Grid item xs={2}>
                        <Typography variant='h4'>{profileCompletionScore}%</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ padding: 2 }}>
                        <LinearProgress variant='determinate' value={profileCompletionScore} style={{ borderRadius: '10px', height: '40px' }}/>
                    </Grid>
                </Grid>
                <Box paddingTop={2}>
                    <Button variant='contained' color='primary' sx={{ width: '100%', height: '50px' }} onClick={() => navigate('/BuildRentalProfile')}>
                        {(profileCompletionScore === 100) ? 'Update Profile' : 'Finish Building Your Profile'}
                    </Button>
                </Box>
            </Paper>
        )
    }

    const ApplyAnywhere = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4'>Apply Anywhere</Typography>
                <Typography variant='body1' paddingTop={2}>Re-use your Rent Connect Profile and apply for any property</Typography>
                <Box paddingTop={2}>
                    <Button variant='contained' color='primary' sx={{ width: '100%', height: '50px' }} onClick={() => navigate('/property')}>
                        Apply Anywhere
                    </Button>
                </Box>
            </Paper>
            
        )
    }
    
    const RentalApplications = () => {
        return (
            <Paper sx={{ padding: '3% 10%', marginTop: '30px' }}>
                <Typography variant='h4' paddingBottom={2}>Your Rental Applications</Typography>
                {(appliedProperties.length === 0) ? (
                    <Typography variant='body1'>You currently have no applications in progress</Typography> 
                ) : (
                    appliedProperties.map((appliedProperty, index) => (
                        <ApplicationCard key={index} application={appliedProperty} />
                    ))
                )}
            </Paper>
        )
    }

    return (
        <Box>
            <NavigationMenu />
            <Box display="flex" justifyContent="center">
                <Box margin={2} sx={{ width: '50%', marginTop: '64px', marginLeft: '190px' }} >
                    <ProfileCompletion />
                    <ApplyAnywhere />
                    <RentalApplications />
                </Box>
            </Box>
        </Box>
    )
}

export default RentalProfile