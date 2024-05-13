import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { app } from '../../firebaseConfig'
import { getFirestore, collection, doc, getDoc, getDocs, arrayUnion, updateDoc } from 'firebase/firestore/lite'
import { List, ListItem, Typography, CircularProgress, Grid, Paper, Button, TextField, Box, Divider } from '@mui/material'
import { Chat, Check, Close, Star, StarBorder } from '@mui/icons-material'
import NavigationMenu from '../navigation_menu/NavigationMenus'

function ApplicationDetails() {
    const [applicationData, setApplicationData] = useState(null)
    const [applicantData, setApplicantData] = useState({
        details: {},
        addressHistory: {},
        employmentHistory: {},
        income: {},
        identity: {},
        petDetails: {}
    })
    const { applicationId } = useParams()
    const [showComment, setShowComment] = useState(false)
    const [commentPosition, setCommentPosition] = useState(0)
    const [commentType, setCommentType] = useState('')
    const [comment, setComment] = useState('') 

    const [applicationDocRefConst, setApplicationDocRef] = useState(null)

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                // Get application data
                const db = getFirestore(app)
                const applicationsRef = collection(db, 'Applications')
                const applicationDocRef = doc(applicationsRef, applicationId)
                setApplicationDocRef(applicationDocRef)
                const applicationDoc = await getDoc(applicationDocRef)
                if (applicationDoc.exists) {
                    setApplicationData(applicationDoc.data())

                    // Applicant reference
                    const tenantRef = collection(db, 'Tenants')
                    const tenantDocRef = collection(tenantRef, applicationDoc.data().TenantID, 'Details')

                    // Applicant details
                    const tenantDetailsRef = doc(tenantDocRef, 'Details')
                    const applicantDetails = await getDoc(tenantDetailsRef)

                    // Applicant address history
                    const applicantAddressHistoryRef = doc(tenantDocRef, 'AddressHistory')
                    const applicantAddressHistory = await getDoc(applicantAddressHistoryRef)

                    // Applicant employment history
                    const applicantEmploymentHistoryDocRef = doc(tenantDocRef, 'EmploymentHistory')
                    const applicantEmploymentHistoryData = await getDoc(applicantEmploymentHistoryDocRef)
                    const applicantEmploymentHistoryRef = collection(applicantEmploymentHistoryDocRef, 'EmploymentHistory')
                    const applicantEmploymentHistory = []
                    await getDocs(applicantEmploymentHistoryRef).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            applicantEmploymentHistory.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        })
                    })
                    
                    // Applicant income
                    const applicantIncomeDocRef = doc(tenantDocRef, 'Income')
                    const applicantIncomeData = await getDoc(applicantIncomeDocRef)
                    const applicantIncomeRef = collection(applicantIncomeDocRef, 'Income')
                    const applicantIncome = {}
                    await getDocs(applicantIncomeRef).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            applicantIncome[doc.id] = {
                                documents: doc.data()
                            }
                        })
                    })
                    
                    // Applicant identity
                    const applicantIdentityDocRef = doc(tenantDocRef, 'Identity')
                    const applicantIdentityData = await getDoc(applicantIdentityDocRef)
                    const applicantIdentityRef = collection(applicantIdentityDocRef, 'Identity')
                    const applicantIdentity = {}
                    await getDocs(applicantIdentityRef).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            applicantIdentity[doc.id] = {
                                documents: doc.data()
                            }
                        })
                    })
                    
                    // Applicant pet details
                    const applicantPetDetailsDocRef = doc(tenantDocRef, 'PetDetails')
                    const applicantPetDetailsData = await getDoc(applicantPetDetailsDocRef)
                    const applicantPetDetailsRef = collection(applicantPetDetailsDocRef, 'PetDetails')
                    const applicantPetDetails = []
                    await getDocs(applicantPetDetailsRef).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            applicantPetDetails.push({
                                id: doc.id,
                                ...doc.data()
                            })
                        })
                    })

                    // Create applicant
                    const applicant = {
                        details: applicantDetails.data(),
                        addressHistory: applicantAddressHistory.data(),
                        employmentHistory: {
                            data: applicantEmploymentHistoryData.data(),
                            employmentHistory: applicantEmploymentHistory
                        },
                        income: {
                            data: applicantIncomeData.data(),
                            income: applicantIncome
                        },
                        identity: {
                            data: applicantIdentityData.data(),
                            identity: applicantIdentity
                        },
                        petDetails: {
                            data: applicantPetDetailsData.data(),
                            petDetails: applicantPetDetails
                        }
                    }
                    setApplicantData(applicant)
                } else {
                    console.log('Unable to find application')
                }
            } catch (error) {
                console.error('Error fetching application data:', error)
            }
        }
    fetchApplicationData()
    }, [applicationId])

    const Outline = () => {
        const goToSection = (section) => {
            const element = document.getElementById(section)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }

        const result = (
            <Box className='outline'>
                <Paper sx={{ padding: 2, position: 'fixed', width: '20%', height: '92%', margin: '30px' }}>
                    {applicantData && (
                        <Box>
                            <Typography variant='h6'>{applicantData.details.FirstName} {applicantData.details.LastName}</Typography>
                            <List>
                                <ListItem variant='h6'>Primary Applicant</ListItem>
                                <ListItem variant='h6'>Phone: {applicantData.details.Phone}</ListItem>
                                <ListItem variant='h6'>Email: {applicantData.details.Email}</ListItem>
                            </List>
                        </Box>
                    )}
                    <Box>
                        <Typography variant='h6'>Outline</Typography>
                        <List>
                            <ListItem onClick={() => goToSection('preferences')}>Preferences</ListItem>
                            <ListItem onClick={() => goToSection('addressHistory')}>Address History</ListItem>
                            <ListItem onClick={() => goToSection('employmentHistory')}>Employment History</ListItem>
                            <ListItem onClick={() => goToSection('income')}>Income</ListItem>
                            <ListItem onClick={() => goToSection('identity')}>Identity</ListItem>
                            <ListItem onClick={() => goToSection('petDetails')}>Pet Details</ListItem>
                        </List>
                    </Box>
                </Paper>
            </Box>
        )
        
        return result
    }

    const Content = () => {
        const handleCommentsClick = (event, type) => {
            const position = event.currentTarget.closest('.paper').getBoundingClientRect().top + window.scrollY
            setCommentPosition(position)
            if (commentType === type) {
                setShowComment(!showComment)
            } else {
                setCommentType(type)
                setShowComment(true)
            }
        }

        const handleVerification = async (verificationType, verificationStatus) => {
            try {
                setApplicationData({
                    ...applicationData,
                    [verificationType]: verificationStatus
                })
                await updateDoc(applicationDocRefConst, {
                    [verificationType]: verificationStatus
                })
            } catch (error) {
                console.error('Error updating verification:', error)
            }
        }

        if (!applicantData || !applicationData) {
            return <CircularProgress />
        } else {
            return (
                <div>
                <Box className='content' sx={{ width: '100%',  marginLeft: '200px'}}>
                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='preferences'>Preferences</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.PreferencesVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PreferencesVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PreferencesVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'PreferencesComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PreferencesVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PreferencesVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'PreferencesComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container alignItems='center'>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Rent</Typography>
                                <Typography variant='body1'>{applicationData.Rent}/w</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Term</Typography>
                                <Typography variant='body1'>{applicationData.Term} months</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Lease Start</Typography>
                                <Typography variant='body1'>{applicationData.LeaseStart.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container alignItems='center'>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Adults</Typography>
                                <Typography variant='body1'>{applicationData.Adults}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Children</Typography>
                                <Typography variant='body1'>{applicationData.Children}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body1' color='text.secondary'>Pets</Typography>
                                <Typography variant='body1'>{applicationData.Pets}</Typography>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Typography variant='body1' color='text.secondary'>Details & Requests:</Typography>
                        <Typography variant='body1'>{applicationData.Details}</Typography>
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='addressHistory'>Address History</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.AddressHistoryVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('AddressHistoryVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('AddressHistoryVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'AddressHistoryComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('AddressHistoryVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('AddressHistoryVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'AddressHistoryComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        <br></br>
                        <Typography variant='h6'>{applicantData.addressHistory.Address}</Typography>
                        <Box paddingTop={1} paddingBottom={1}>
                            <Divider />
                        </Box>
                        
                        <Typography variant='body1' color='text.secondary'>Contact</Typography>
                        <Typography variant='body1' paddingBottom={1}>{applicantData.addressHistory.ReviewerID}</Typography>
                        <Typography variant='body1' color='text.secondary'>Comments</Typography>
                        <Typography variant='body1' paddingBottom={1}>{applicantData.addressHistory.Comments}</Typography>
                        <Typography variant='body1' color='text.secondary'>Feedback</Typography>
                        <Typography variant='body1'>{applicantData.addressHistory.Feedback}</Typography>
                        
                        <Box paddingTop={1} paddingBottom={1}>
                            <Divider />
                        </Box>

                        <Typography variant='body1' color='text.secondary'>Questions</Typography>
                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={6}>
                                <Typography variant='body1'>Pleasantness:</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {[...Array(5)].map((_, index) => (
                                    <React.Fragment>
                                        {index < applicantData.addressHistory.PleasantnessRating ? <Star color='primary' style={{ width: '32px', height: '32px' }}/> : <StarBorder color='primary' style={{ width: '32px', height: '32px' }}/>}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>
                        
                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={6}>
                                <Typography variant='body1'><Typography variant='body1'>Cares about the property:</Typography></Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {[...Array(5)].map((_, index) => (
                                    <React.Fragment>
                                        {index < applicantData.addressHistory.PropertyCareRating ? <Star color='primary' style={{ width: '32px', height: '32px' }}/> : <StarBorder color='primary' style={{ width: '32px', height: '32px' }}/>}
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Would you rent the tenant again?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.Recommended ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Were there deductions to the bond?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.BondDeductions ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Did the tenant pay rent on time?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.OnTimePayments ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Were repair and maintenance requests reasonable?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.ReasonableRequests ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Were pets kept on the property without permission?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.UnpermittedPets ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Were pets kept on the property without permission?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.UnpermittedPets ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Did you receive any complaints during the tenancy?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.ComplaintsReceived ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Did the tenant leave the property in a reasonable condition?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.ReasonablePropertyCondition ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Did you expect the tenant to terminate the tenancy?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.ExpectedTermination ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container alignItems='center' paddingBottom={2}>
                            <Grid xs={8}>
                                <Typography variant='body1'><Typography variant='body1'>Did you expect the bond claim to be fully claimed?</Typography></Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent='flex-end'>
                                {applicantData.addressHistory.FullBondClaim ? (
                                    <Typography variant='body1' style={{ backgroundColor: 'green', color: 'white', padding: '2px 10px', borderRadius: '5px'}}>Yes</Typography>
                                ) : (
                                    <Typography variant='body1' style={{ backgroundColor: 'red', color: 'white', padding: '2px 13px', borderRadius: '5px'}}>No</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='employmentHistory'>Employment History</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.EmploymentHistoryVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('EmploymentHistoryVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('EmploymentHistoryVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'EmploymentHistoryComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('EmploymentHistoryVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('EmploymentHistoryVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'EmploymentHistoryComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        {applicantData.employmentHistory.employmentHistory && applicantData.employmentHistory.employmentHistory.map((employment, index) => (
                            <Paper sx={{ padding: 2, marginTop: '20px', backgroundColor: '#DBCCE5' }}>
                                <Typography variant='h6'>{employment.EmploymentTitle} at {employment.EmploymentLocation}</Typography>
                                <Box paddingTop={1} paddingBottom={1}>
                                    <Divider />
                                </Box>
                                <Grid container alignItems='center'>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>Type</Typography>
                                        <Typography variant='body1'>{employment.EmploymentType.replace(/([A-Z])/g, ' $1').trim()}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>Gross Income</Typography>
                                        <Typography variant='body1'>${employment.GrossIncome} p/a</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>Net Income</Typography>
                                        <Typography variant='body1'>${Math.round(employment.NetIncome/12)} p/w</Typography>
                                    </Grid>
                                </Grid>
                                <br></br>
                                <Grid container alignItems='center'>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>Tenure</Typography>
                                        <Typography variant='body1'>
                                            {employment.CurrentlyPresent ? (
                                                (() => {
                                                const currentDate = new Date();
                                                const startYear = employment.StartDate.toDate().getFullYear();
                                                const startMonth = employment.StartDate.toDate().getMonth();
                                                const currentYear = currentDate.getFullYear();
                                                const currentMonth = currentDate.getMonth();
                                                let yearsDifference = currentYear - startYear;
                                                let monthsDifference = currentMonth - startMonth;

                                                if (monthsDifference < 0) {
                                                    yearsDifference -= 1;
                                                    monthsDifference += 12;
                                                }

                                                return `${yearsDifference} years, ${monthsDifference} months`;
                                                })()
                                            ) : (
                                                (() => {
                                                const startYear = employment.StartDate.toDate().getFullYear();
                                                const startMonth = employment.StartDate.toDate().getMonth();
                                                const endYear = employment.EndDate.toDate().getFullYear();
                                                const endMonth = employment.EndDate.toDate().getMonth();
                                                let yearsDifference = endYear - startYear;
                                                let monthsDifference = endMonth - startMonth;

                                                if (monthsDifference < 0) {
                                                    yearsDifference -= 1;
                                                    monthsDifference += 12;
                                                }

                                                return `${yearsDifference} years, ${monthsDifference} months`;
                                                })()
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>Start Date</Typography>
                                        <Typography variant='body1'>{employment.StartDate.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant='body1' color='text.secondary'>End Date</Typography>
                                        <Typography variant='body1'>{employment.CurrentlyPresent ? (employment.EndDate.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })) : ('Currently Present')}</Typography>
                                    </Grid>
                                </Grid>
                                <br></br>
                                <Typography variant='body1' color='text.secondary'>Contact</Typography>
                                <Typography variant='body1'>Employer Name: {employment.ContactFirstName} {employment.ContactLastName}</Typography>
                                <Typography variant='body1'>Employer Phone: {employment.ContactPhone}</Typography>
                                <Typography variant='body1'>Employer Email: {employment.ContactEmail}</Typography>
                            </Paper>
                        ))}
                    </Paper>
                    
                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='income'>Income</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.IncomeVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IncomeVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IncomeVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'IncomeComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IncomeVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IncomeVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'IncomeComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant='h6'>Bank Statements</Typography>
                                {applicantData.income.BankStatements && applicantData.income.BankStatements.map((document, index) => (
                                    <Typography variant='body1'>{document}</Typography>
                                ))}
                                <Typography variant='body1'>I don't know what goes here. PDF I guess?</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6'>Payslips</Typography>
                                    {applicantData.income.Payslips && applicantData.income.Payslips.map((document, index) => (
                                <Typography variant='body1'>{document}</Typography>
                        ))}
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant='h6'>Government Benefit Documents</Typography>
                                {applicantData.income.GovernmentBenefitDocuments && applicantData.income.GovernmentBenefitDocuments.map((document, index) => (
                                    <Typography variant='body1'>{document}</Typography>
                                ))}
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6'>Other Income Documents</Typography>
                                {applicantData.income.OtherIncomeDocuments && applicantData.income.OtherIncomeDocuments.map((document, index) => (
                                    <Typography variant='body1'>{document}</Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='identity'>Identity</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.IdentityVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IdentityVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IdentityVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'IdentityComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IdentityVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('IdentityVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'IdentityComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        {applicantData.identity.identity && Object.keys(applicantData.identity.identity).map((key, index) => {
                            switch (key) {
                                case 'DriverLicence':
                                    return (
                                        <Box>
                                            <Box paddingTop={1} paddingBottom={1}>
                                                <Divider />
                                            </Box>
                                            <Typography variant='h6' paddingBottom={1}>Drivers Licence</Typography>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Typography variant='body1' color='text.secondary'>Number</Typography>
                                                    <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.Number}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant='body1' color='text.secondary'>Expiry Date</Typography>
                                                    <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.Expiry.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant='body1' color='text.secondary'>Date of Birth</Typography>
                                                    <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.DoB.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>

                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant='body1' color='text.secondary'>State</Typography>
                                                    <Typography variant='body1'>{applicantData.identity.identity.DriverLicence.documents.State}</Typography>

                                                </Grid>
                                            </Grid>                                            
                                        </Box>
                                    )
                                case 'Passport':
                                    return (
                                        <Box>
                                            <Box paddingTop={1} paddingBottom={1}>
                                                <Divider />
                                            </Box>
                                            <Typography variant='h6' paddingBottom={1}>Passport</Typography>
                                        </Box>
                                    )
                                default:
                                    return (
                                        <Box></Box>
                                    )
                            }
                        })}
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px', marginBottom: '30px' }} elevation={10}>
                        <Grid container alignItems='center'>
                            <Grid item xs={6}>
                                <Typography variant='h4' id='petDetails'>Pet Details</Typography>
                            </Grid>
                            <Grid item xs={6} container justifyContent='flex-end'>
                                {applicationData.PetDetailsVerified ? (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'green', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PetDetailsVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PetDetailsVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'PetDetailsComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button className='verifiedCheckButton' variant='contained' color='primary' disabled={false} style={{ backgroundColor: 'grey', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PetDetailsVerified', true)}>
                                            <Check />
                                        </Button>
                                        <Button className='verifiedCrossButton' variant='contained' color='primary' disabled={true} style={{ backgroundColor: 'red', color: 'white', marginRight: '4px' }} onClick={() => handleVerification('PetDetailsVerified', false)}>
                                            <Close />
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={(event) => handleCommentsClick(event, 'PetDetailsComments')}>
                                            <Chat />
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        {applicantData.petDetails.petDetails && applicantData.petDetails.petDetails.map((pet, index) => (
                            <Paper sx={{ padding: 2, marginTop: '20px', backgroundColor: '#DBCCE5' }}>
                                <Typography variant='h6'>{pet.Name} ({pet.Species})</Typography>
                                <Typography variant='body1'>{pet.Age} y/o, {pet.IndoorsStatus}</Typography>
                                <Typography variant='body1'>Desexed: {pet.Desexed ? 'Yes' : 'No'}</Typography>
                                <Typography variant='body1'>Microchip Number: {pet.MicrochipNumber ? pet.MicrochipNumber : 'Not Microchipped'}</Typography>
                                <Typography variant='body1'>Registration Number: {pet.RegistrationNumber ? pet.RegistrationNumber : 'Not Registered'}</Typography>
                            </Paper>
                        ))}
                    </Paper>
                </Box>
                </div>
            )
        }
    }

    const handleAddComment = async () => {
        if (comment.trim() !== '') {
            if (applicationData[commentType].includes(comment)) {
                console.log('Comment already exists')
                setComment('')             
            } else {
                try {
                    await updateDoc(applicationDocRefConst, {
                        [commentType]: arrayUnion(comment)
                    })
                } catch (error) {
                    console.error('Error adding comment:', error)
                }
                applicationData[commentType].push(comment)
                setComment('')
            }
        }
    }

    return (
        <div>
        <NavigationMenu>
        <Grid container spacing={0} sx={{ marginTop: '64px' }}>
            <Grid item xs={3}>
                <Outline />
            </Grid>
    
            <Grid item xs={6}>
                <Content />
            </Grid>

            <Grid item xs={3}>
                <Box>
                    {showComment && (
                        <Box style={{ padding: 2, width: '22%', position: 'absolute', top: commentPosition + 'px' }}>
                            {showComment && (
                                applicationData[commentType].map((comment, index) => (
                                    <Paper sx={{ padding: 2, width: '100%', marginLeft: '30px', marginBottom: '30px' }}>
                                        {comment}
                                    </Paper>
                                ))
                            )}

                            <Paper sx={{ padding: 2, width: '100%', marginLeft: '30px', marginBottom: '30px' }}>
                                <TextField
                                    className='commentBox'
                                    label='Comment'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant='outlined'
                                    margin='dense'
                                />

                                <Button className='textField' variant='contained' color='primary' onClick={handleAddComment}>
                                    Add Comment
                                </Button>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
        </NavigationMenu>
        </div>

    )
}

export default ApplicationDetails