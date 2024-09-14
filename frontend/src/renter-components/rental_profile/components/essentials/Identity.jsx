import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Divider } from '@mui/material'
import useGetApplicationSupportingDocumentsByRenterID from '../../../../queries/Application Supporting Document/useGetApplicationSupportingDocumentsByRenterID'
import IdentityContentTitle from './IdentityContentTitle'
import IdentityCard from './IdentityCard'
import IdentityDialog from '../Dialogs/IdentityDialog'
import useSubscribeTableByRenterID from '../../../../subscribers/useSubscribeTableByRenterID'

function Identity({ userID }) {
    const fetchedIdentityDocuments = useGetApplicationSupportingDocumentsByRenterID(userID)
    const [identityDocuments, setIdentityDocuments] = useState(null)
    const [driversLicence, setDriversLicence] = useState([])
    const [passport, setPassport] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [identityType, setIdentityType] = useState('')

    useEffect(() => {
        setIdentityDocuments(fetchedIdentityDocuments)
    }, [fetchedIdentityDocuments])

    useEffect(() => {
        if (identityDocuments) {
            const driversLicences = identityDocuments.filter(doc => doc.application_supporting_document_type === 'Drivers Licence')
            const passports = identityDocuments.filter(doc => doc.application_supporting_document_type === 'Passport')
            
            setDriversLicence(driversLicences)
            setPassport(passports)
        }
    }, [identityDocuments])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addButton(identityType) {
        setIdentityType(identityType)
        setIsDialogOpen(true)
    }

    const updateIdentityDocument = useCallback((payload) => {
        switch (payload.eventType) {
            case 'INSERT':
                setIdentityDocuments([...identityDocuments, payload.new])
                break
            case 'UPDATE':
                const updatedDocuments = identityDocuments.map((document) => {
                    if (document.application_supporting_document_id === payload.new.application_supporting_document_id) {
                        return payload.new
                    }
                    return document
                })
                setIdentityDocuments(updatedDocuments)
                break
            case 'DELETE':
                const filteredDocuments = identityDocuments.filter((document) => document.application_supporting_document_id !== payload.old.application_supporting_document_id)
                setIdentityDocuments(filteredDocuments)
                break
            default:
                break
        }
    }, [identityDocuments, setIdentityDocuments])
    useSubscribeTableByRenterID('APPLICATION-SUPPORTING-DOCUMENT', userID, updateIdentityDocument)
    
    return (
        <>
            <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant='h5'>Identity Documents</Typography>
                <Divider/>
                <IdentityContentTitle title={'Drivers Licence'} addOnClick={() => addButton('Drivers Licence')} />
                {(driversLicence.length > 0) && (
                    driversLicence.map((document, index) => (
                        <IdentityCard key={index} document={document} />
                )))}
                <Divider/>
                <IdentityContentTitle title={'Passport'} addOnClick={() => addButton('Passport')} />
                {(passport.length > 0) && (
                    passport.map((document, index) => (
                        <IdentityCard key={index} document={document} />
                )))}
            </Paper>
            {isDialogOpen && <IdentityDialog document={{renter_id: userID}} identityType={identityType} closeDialog={closeDialog} isUpdate={false}/>}
        </>
    )
}

export default Identity