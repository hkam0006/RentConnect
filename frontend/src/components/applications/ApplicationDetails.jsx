import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { app } from '../../firebaseConfig'
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore/lite'
import { List, ListItem, Typography, CircularProgress, Grid, Paper, Button, TextField, Box } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'

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

    useEffect(() => {
        const fetchApplicationData = async () => {
            try {
                // Get application data
                const db = getFirestore(app)
                const applicationsRef = collection(db, 'Applications')
                const applicationDocRef = doc(applicationsRef, applicationId)
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
                    console.log(applicant)
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
            <Box className='outline' >
                <Paper sx={{ padding: 2, position: 'fixed', width: '17%', height: '87%', margin: '30px' }}>
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
            console.log(position)
            setCommentPosition(position)
            if (commentType === type) {
                setShowComment(!showComment)
            } else {
                setCommentType(type)
                setShowComment(true)
            }
        }

        if (!applicantData || !applicationData) {
            return <CircularProgress />
        } else {
            return (
                <Box className='content' sx={{ width: '95%'}}>
                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='preferences'>Preferences</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'PreferencesComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Applicant ID: {applicantData.TenantID}</Typography>
                        <Typography variant='body1'>Adults: {applicationData.Adults}</Typography>
                        <Typography variant='body1'>Children: {applicationData.Children}</Typography>
                        <Typography variant='body1'>Pets: {applicationData.Pets}</Typography>
                        <Typography variant='body1'>Rent: {applicationData.Rent}</Typography>
                        <Typography variant='body1'>Term: {applicationData.Term}</Typography>
                        <Typography variant='body1'>Lease Start: {applicationData.LeaseStart.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                        <Typography variant='body1'>Details: {applicationData.Details}</Typography>
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='addressHistory'>Address History</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'AddressHistoryComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Verified: {applicationData.AddressHistoryVerified ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Address: {applicantData.addressHistory.Address}</Typography>
                        <Typography variant='body1'>Reviewer ID: {applicantData.addressHistory.ReviewerID}</Typography>
                        <Typography variant='body1'>Comments: {applicantData.addressHistory.Comments}</Typography>
                        <Typography variant='body1'>Feedback: {applicantData.addressHistory.Feedback}</Typography>
                        <Typography variant='body1'>Pleasantness: {applicantData.addressHistory.PleasantnessRating}/5</Typography>
                        <Typography variant='body1'>Cares about the property: {applicantData.addressHistory.PropertyCareRating}/5</Typography>
                        <Typography variant='body1'>Would you rent the tenant again? {applicantData.addressHistory.Recommended ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Were there deductions to the bond? {applicantData.addressHistory.BondDeductions ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Did the tenant pay rent on time? {applicantData.addressHistory.OnTimePayments ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Were repair and maintenance requests reasonable? {applicantData.addressHistory.ReasonableRequests ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Were pets kept on the property without permission? {applicantData.addressHistory.UnpermittedPets ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Did you receive any complaints during the tenancy? {applicantData.addressHistory.ComplaintsReceived ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Did the tenant leave the property in a reasonable condition? {applicantData.addressHistory.ReasonablePropertyCondition ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Did you expect the tenant to terminate the tenancy? {applicantData.addressHistory.ExpectedTermination ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Did you expect the bond claim to be fully claimed? {applicantData.addressHistory.FullBondClaim ? 'Yes' : 'No'}</Typography>
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='employmentHistory'>Employment History</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'EmploymentHistoryComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Verified: {applicationData.EmploymentHistoryVerified ? 'Yes' : 'No'}</Typography>
                        {applicantData.employmentHistory.employmentHistory && applicantData.employmentHistory.employmentHistory.map((employment, index) => (
                            <Box>
                                <Typography variant='body1'>Title: {employment.EmploymentTitle}</Typography>
                                <Typography variant='body1'>Location: {employment.EmploymentLocation}</Typography>
                                <Typography variant='body1'>Employment Type: {employment.EmploymentType}</Typography>
                                <Typography variant='body1'>Gross Income: {employment.GrossIncome}</Typography>
                                <Typography variant='body1'>Net Income: {employment.NetIncome}</Typography>
                                <Typography variant='body1'>Location: {employment.EmploymentLocation}</Typography>
                                <Typography variant='body1'>Employer Name: {employment.ContactFirstName} {employment.ContactLastName}</Typography>
                                <Typography variant='body1'>Employer Phone: {employment.ContactPhone}</Typography>
                                <Typography variant='body1'>Employer Email: {employment.ContactEmail}</Typography>
                                <Typography variant='body1'>Start Date: {employment.StartDate.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                {(employment.CurrentlyPresent ? <Typography variant='body1'>End Date: {employment.EndDate.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Typography> : <Typography variant='body1'>End Date: Currently Present</Typography>)}
                            </Box>
                        ))}
                    </Paper>
                    
                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='income'>Income</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'IncomeComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Verified: {applicationData.IncomeVerified ? 'Yes' : 'No'}</Typography>
                        <Typography variant='body1'>Bank Statements</Typography>
                        {applicantData.income.BankStatements && applicantData.income.BankStatements.map((document, index) => (
                            <Typography variant='body1'>{document}</Typography>
                        ))}
                        <Typography variant='body1'>Payslips</Typography>
                        {applicantData.income.Payslips && applicantData.income.Payslips.map((document, index) => (
                            <Typography variant='body1'>{document}</Typography>
                        ))}
                        <Typography variant='body1'>Government Benefit Documents</Typography>
                        {applicantData.income.GovernmentBenefitDocuments && applicantData.income.GovernmentBenefitDocuments.map((document, index) => (
                            <Typography variant='body1'>{document}</Typography>
                        ))}
                        <Typography variant='body1'>Other Income Documents</Typography>
                        {applicantData.income.OtherIncomeDocuments && applicantData.income.OtherIncomeDocuments.map((document, index) => (
                            <Typography variant='body1'>{document}</Typography>
                        ))}
                    </Paper>

                    <Paper className='paper' sx={{ padding: 2, width: '100%', height: '100%', marginTop: '30px' }} elevation={10}>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='identity'>Identity</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'IdentityComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Verified: {applicantData.IdentityVerified ? 'Yes' : 'No'}</Typography>
                        {applicantData.identity.identity && Object.keys(applicantData.identity.identity).map((key, index) => {
                            switch (key) {
                                case 'DriverLicence':
                                    return (
                                        <Box>
                                            <Typography variant='body1'>Drivers Licence</Typography>
                                            <Typography variant='body1'>Number: {applicantData.identity.identity.DriverLicence.Number}</Typography>
                                            <Typography variant='body1'>Expiry: {applicantData.identity.identity.DriverLicence.Expiry}</Typography>
                                            <Typography variant='body1'>Date of Birth: {applicantData.identity.identity.DriverLicence.DoB}</Typography>
                                            <Typography variant='body1'>State: {applicantData.identity.identity.DriverLicence.State}</Typography>
                                        </Box>
                                    )
                                case 'Passport':
                                    return (
                                        <Box>
                                            <Typography variant='body1'>Passport</Typography>
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
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant='h4' id='petDetails'>Pet Details</Typography>
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
                                <Button variant="contained" color="primary" onClick={(event) => handleCommentsClick(event, 'PetDetailsComments')}>
                                    <ChatIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography variant='body1'>Verified: {applicantData.PetDetailsVerified ? 'Yes' : 'No'}</Typography>
                        {applicantData.petDetails.petDetails && applicantData.petDetails.petDetails.map((pet, index) => (
                            <Box>
                                <Typography variant='body1'>Name: {pet.Name}</Typography>
                                <Typography variant='body1'>Species: {pet.Species}</Typography>
                                <Typography variant='body1'>Age: {pet.Age}</Typography>
                                <Typography variant='body1'>Name: {pet.Name}</Typography>
                                <Typography variant='body1'>Indoors Staus: {pet.Name}</Typography>
                                <Typography variant='body1'>Desexed: {pet.Desexed ? 'Yes' : 'No'}</Typography>
                                <Typography variant='body1'>Microchip Number: {pet.MicrochipNumber}</Typography>
                                <Typography variant='body1'>Registration Number: {pet.RegistrationNumber}</Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>
            )
        }
    }

    const handleAddComment = () => {
        if (comment.trim() !== '') {
            console.log(comment)
            setComment('')
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={3}>
                <Outline />
            </Grid>
    
            <Grid item xs={6}>
                <Content />
            </Grid>

            <Grid item xs={3}>
                <Box>
                    {showComment && (
                        <Box style={{ padding: 2, width: '18%', position: 'absolute', top: commentPosition + 'px' }}>
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
                                    variant="outlined"
                                    margin="dense"
                                />

                                <Button className="textField" variant="contained" color="primary" onClick={handleAddComment}>
                                    Add Comment
                                </Button>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ApplicationDetails