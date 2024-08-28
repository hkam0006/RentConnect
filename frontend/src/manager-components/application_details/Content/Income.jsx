import React from 'react'
import { Typography, Grid, Paper } from '@mui/material'

import ContentTitle from './ContentTitle'
import BankStatements from './IncomeContent/BankStatements'
import Payslips from './IncomeContent/Payslips'
import GovernmentBenefitDocuments from './IncomeContent/GovernmentBenefitDocuments'
import OtherIncomeDocuments from './IncomeContent/OtherIncomeDocuments'

function Income({ income, verified, handleVerification, handleCommentsClick }) {
    return (
        <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='IncomePaper'>
            <ContentTitle 
                content={'Income'} 
                verified={verified} 
                handleVerification={handleVerification} 
                handleCommentsClick={handleCommentsClick}
            />
            <Grid container paddingTop={2}>
                <Grid item xs={6}>
                    <Typography variant='h6'>Bank Statements</Typography>
                    <BankStatements statement={income.bank_statements} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h6'>Payslips</Typography>
                    <Payslips statement={income.payslips} />
                </Grid>
            </Grid>
            <Grid container paddingTop={2}>
                <Grid item xs={6}>
                    <Typography variant='h6'>Government Benefit Documents</Typography>
                    <GovernmentBenefitDocuments statement={income.government_benefit_documents} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h6'>Other Income Documents</Typography>
                    <OtherIncomeDocuments statement={income.other_income_documents} />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Income