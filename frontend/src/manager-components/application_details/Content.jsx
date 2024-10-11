import React from 'react'
import { CircularProgress, Paper, Box, Alert } from '@mui/material'

import Preferences from './Content/Preferences'
import AddressHistory from './Content/AddressHistory'
import EmploymentHistory from './Content/EmploymentHistory'
import Income from './Content/Income'
import Identity from './Content/Identity'
import Pets from './Content/Pets'

function Content({ application, applicationComment, applicationSupportingDocument, renter, renterTenancy, renterEmployment, renterPet, renterComment, handleVerification, handleCommentsClick, loading }) {
    // Test income
    const income = {
        bank_statements: [], 
        payslips: [], 
        government_benefit_documents: [], 
        other_income_documents: []
    }
    
    if (application && applicationComment && applicationSupportingDocument && renter && renterTenancy && renterEmployment && renterPet && renterComment) {
        return (
            <Box sx={{ padding: 2 }}>
                <Preferences application={application} verified={application.preferences_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick} />
                <AddressHistory renterTenancy={renterTenancy} verified={application.address_history_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick}/>
                <EmploymentHistory renterEmployment={renterEmployment} verified={application.employment_history_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick}/>
                <Income income={income} verified={application.income_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick}/>
                <Identity identity={applicationSupportingDocument} verified={application.identity_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick}/>
                <Pets renterPet={renterPet} verified={application.pets_verified} handleVerification={handleVerification} handleCommentsClick={handleCommentsClick}/>
            </Box>
        )
    } else if (loading) {
        return (
            <Paper sx={{ padding: 2, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <CircularProgress />
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No application found
                </Alert>
            </Paper>
        )
    }
}

export default Content
