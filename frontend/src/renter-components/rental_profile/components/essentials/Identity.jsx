import { useState, useEffect } from 'react'
import { Paper, Typography, Divider } from '@mui/material'
import useGetApplicationSupportingDocumentsByRenterID from '../../../../queries/Application Supporting Document/useGetApplicationSupportingDocumentsByRenterID'
import IdentityContentTitle from './IdentityContentTitle'

function Identity({ userID }) {
    const identityDocuments = useGetApplicationSupportingDocumentsByRenterID(userID)
    const [driversLicence, setDriversLicence] = useState([])
    const [passport, setPassport] = useState([])

    useEffect(() => {
        if (identityDocuments && identityDocuments.length > 0) {
            const driversLicences = identityDocuments.filter(doc => doc.application_supporting_document_type === 'Drivers Licence')
            const passports = identityDocuments.filter(doc => doc.application_supporting_document_type === 'Passport')
            
            setDriversLicence(driversLicences)
            setPassport(passports)
        }
    }, [identityDocuments])
    function addIdentity(identityType) {
        console.log(`lets add an ${identityType} document`)
    }

    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant='h5'>Identity Documents</Typography>
            <Divider/>
            <IdentityContentTitle title={'Drivers Licence'} addOnClick={() => addIdentity('Drivers Licence')} hasIdentity={driversLicence.length > 0} />
            {(driversLicence.length > 0) && (
                driversLicence.map(document => (
                <Typography>
                    {document.application_supporting_document_link}
                </Typography>
            )))}
            <Divider/>
            <IdentityContentTitle title={'Passport'} addOnClick={() => addIdentity('Passport')} hasIdentity={passport.length > 0} />
            {(passport.length > 0) && (
                passport.map(document => (
                <Typography>
                    {document.application_supporting_document_link}
                </Typography>
            )))}
        </Paper>
    )
}

export default Identity