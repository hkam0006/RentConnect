import { useParams } from 'react-router-dom'
import { Paper, Typography, Divider, Alert } from '@mui/material'

import useGetApplicationSupportingDocumentsByRenterID from '../../../queries/Application Supporting Document/useGetApplicationSupportingDocumentsByRenterID'

import ContentTitle from './ContentTitle'
import IdentityCard from './IdentityContent/IdentityCard'

function Identity({ handleCommentsClick }) {
    const { renterId } = useParams()
    const { applicationSupportingDocuments, loading } = useGetApplicationSupportingDocumentsByRenterID(renterId)

    if (loading) {
        return <></>
    } else if (!applicationSupportingDocuments || applicationSupportingDocuments.length === 0) {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='IdentityPaper'>
                <ContentTitle content={'Identity'} handleCommentsClick={handleCommentsClick} />
                <Alert severity='error' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                    No identity documents found
                </Alert>
            </Paper>
        )
    } else {
        return (
            <Paper sx={{ padding: 2, marginTop: '30px' }} elevation={10} id='IdentityPaper'>
                <ContentTitle content={'Identity'} handleCommentsClick={handleCommentsClick} />
                <Typography variant='h6'>Drivers Licence</Typography>
                {applicationSupportingDocuments.filter(document => document.application_supporting_document_type === "Drivers Licence").length > 0 && (
                    applicationSupportingDocuments
                        .filter(document => document.application_supporting_document_type === "Drivers Licence")
                        .map((document, index) => (
                            <IdentityCard key={index} document={document} />
                        ))
                )}
                <Divider/>
                <Typography variant='h6'>Passport</Typography>
                {applicationSupportingDocuments.filter(document => document.application_supporting_document_type === "Passport").length > 0 && (
                    applicationSupportingDocuments
                        .filter(document => document.application_supporting_document_type === "Passport")
                        .map((document, index) => (
                            <IdentityCard key={index} document={document} />
                        ))
                )}
            </Paper>
        )
    }
}

export default Identity
