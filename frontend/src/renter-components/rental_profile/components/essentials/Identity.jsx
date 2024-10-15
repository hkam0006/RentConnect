import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Divider } from '@mui/material'
import useGetApplicationSupportingDocumentsByRenterID from '../../../../queries/Application Supporting Document/useGetApplicationSupportingDocumentsByRenterID'
import IdentityContentTitle from './IdentityContentTitle'
import IdentityCard from './IdentityCard'
import IdentityDialog from '../Dialogs/IdentityDialog'
import useSubscribeTableByRenterID from '../../../../subscribers/useSubscribeTableByRenterID'

function Identity({ userID }) {
    const { applicationSupportingDocuments, setApplicationSupportingDocuments } = useGetApplicationSupportingDocumentsByRenterID(userID)
    const [driversLicence, setDriversLicence] = useState([])
    const [passport, setPassport] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [identityType, setIdentityType] = useState('')

    useEffect(() => {
        if (applicationSupportingDocuments) {
            const driversLicences = applicationSupportingDocuments.filter(doc => doc.application_supporting_document_type === 'Drivers Licence')
            const passports = applicationSupportingDocuments.filter(doc => doc.application_supporting_document_type === 'Passport')
            
            setDriversLicence(driversLicences)
            setPassport(passports)
        }
    }, [applicationSupportingDocuments])

    function closeDialog() {
        setIsDialogOpen(false)
    }

    function addButton(identityType) {
        setIdentityType(identityType)
        setIsDialogOpen(true)
    }

    const getNumberOfIDs = () => {
        return driversLicence.length + passport.length
    };

    const updateIdentityDocument = useCallback((payload) => {
        switch (payload.eventType) {
            case 'INSERT':
                setApplicationSupportingDocuments([...applicationSupportingDocuments, payload.new])
                break
            case 'UPDATE':
                const updatedDocuments = applicationSupportingDocuments.map((document) => {
                    if (document.application_supporting_document_id === payload.new.application_supporting_document_id) {
                        return payload.new
                    }
                    return document
                })
                setApplicationSupportingDocuments(updatedDocuments)
                break
            case 'DELETE':
                const filteredDocuments = applicationSupportingDocuments.filter((document) => document.application_supporting_document_id !== payload.old.application_supporting_document_id)
                setApplicationSupportingDocuments(filteredDocuments)
                break
            default:
                break
        }
    }, [applicationSupportingDocuments, setApplicationSupportingDocuments])
    useSubscribeTableByRenterID('APPLICATION-SUPPORTING-DOCUMENT', userID, updateIdentityDocument)
    
    if (!applicationSupportingDocuments) {
        return <></>
    } else {
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
}

export default Identity