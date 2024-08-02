import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box } from '@mui/material'
import { supabase } from "../../supabase"

import Outline from './Outline'
import Content from './Content'
import Comment from './Comment'

import useGetApplicationsByID from '../../queries/Application/useGetApplicationsByID'
import useGetApplicationCommentByID from '../../queries/Application Comment/useGetApplicationCommentByID'
import useGetApplicationSupportingDocumentsByID from '../../queries/Application Supporting Document/useGetApplicationSupportingDocumentsByID'

import useUpdateApplicationStatusByID from '../../mutators/Application/useUpdateApplicationStatusByID'

import useGetRenterByRenterID from '../../queries/Renter/useGetRenterByRenterID'
import useGetPreviousTenanciesByRenterID from '../../queries/Previous Tenancy/useGetPreviousTenanciesByRenterID'
import useGetRenterEmploymentsByRenterID from '../../queries/Renter Employment/useGetRenterEmploymentsByRenterID'
import useGetPetsByRenterID from '../../queries/Pet/useGetPetsByRenterID'
import useGetRenterCommentsByRenterID from '../../queries/Renter Comment/useGetRenterCommentsByRenterID'
import NavigationMenu from '../navigation_menu/NavigationMenus'
import useAddApplicationComment from '../../mutators/Application Comment/useAddApplicationComment'

function ApplicationDetails() {
    const { companyId, propertyId, renterId } = useParams()

    // Database variables
    const [application, setApplication] = useState(null)
    const initialApplicationCommentState = {
        "Preferences": [],
        "Address History": [],
        "Employment History": [],
        "Income": [],
        "Identity": [],
        "Pets": []
    }
    const [applicationComment, setApplicationComment] = useState(initialApplicationCommentState)
    const [applicationSupportingDocument, setApplicationSupportingDocument] = useState(null)

    const [renter, setRenter] = useState(null)
    const [renterTenancy, setRenterTenancy] = useState(null)
    const [renterEmployment, setRenterEmployment] = useState(null)
    const [renterPet, setRenterPet] = useState(null)
    const [renterComment, setRenterComment] = useState(null)

    // Page variables
    const [showComment, setShowComment] = useState(false)
    const [commentPosition, setCommentPosition] = useState(0)
    const [commentType, setCommentType] = useState('')
    const [comment, setComment] = useState('')

    // Get database data
    const getApplication = useGetApplicationsByID(companyId, propertyId, renterId)
    const getApplicationComment = useGetApplicationCommentByID(propertyId, renterId)
    const getApplicationSupportingDocuments = useGetApplicationSupportingDocumentsByID(propertyId, renterId)

    const getRenter = useGetRenterByRenterID(renterId)
    const getRenterTenancy = useGetPreviousTenanciesByRenterID(renterId)
    const getRenterEmployment = useGetRenterEmploymentsByRenterID(renterId)
    const getRenterPet = useGetPetsByRenterID(renterId)
    const getRenterComment = useGetRenterCommentsByRenterID(renterId)

    const [userID, setUserID] = useState(null)
    useEffect(() => {
        async function getUserID() {
            await supabase.auth.getUser().then((value) =>{
                if (value.data?.user) {
                    setUserID(value.data.user.id)
                }
            })
        }
        getUserID()
    }, [])

    function getAndSetApplicationComments() {
        let newApplicationCommentState = { ...initialApplicationCommentState }
        if (getApplicationComment.length > 0) {
            getApplicationComment.forEach((appComment) => {
                newApplicationCommentState[appComment.type] = [
                    ...newApplicationCommentState[appComment.type],
                    appComment
                ]
            })
        }
        setApplicationComment(newApplicationCommentState)
    }
    useEffect(() => {
        const setFetchedData = () => {
            if (getApplication.length > 0) {
                setApplication(getApplication[0])
            }
            
            getAndSetApplicationComments()

            setApplicationSupportingDocument(getApplicationSupportingDocuments)

            if (getRenter.length > 0) {
                setRenter(getRenter[0])
            }
            
            if (getRenterTenancy.length > 0) {
                setRenterTenancy(getRenterTenancy[0])
            }
            
            setRenterEmployment(getRenterEmployment)

            setRenterPet(getRenterPet)

            setRenterComment(getRenterComment)
        }

        setFetchedData()
    }, [getApplication, getApplicationComment, getApplicationSupportingDocuments, getRenter, getRenterTenancy, getRenterEmployment, getRenterPet, getRenterComment])
    
    const updateVerification = useUpdateApplicationStatusByID()
    const verificationType = {
        'Preferences': 'preferences_verified',
        'Address History': 'address_history_verified',
        'Employment History': 'employment_history_verified',
        'Income': 'income_history_verified',
        'Identity': 'identity_verified',
        'Pets': 'pets_verified'
    }
    function handleVerification(type, verificationStatus) {
        try {
            const type_verified = verificationType[type]
            updateVerification(companyId, propertyId, renterId, type_verified, verificationStatus)
            setApplication((prevState) => ({
                ...prevState,
                [type_verified]: verificationStatus
            }))
        } catch (error) {
            console.error('Error updating verification:', error)
        }
    }

    const selectedCommentID = {
        'Preferences': 'PreferencesPaper',
        'Address History': 'AddressHistoryPaper',
        'Employment History': 'EmploymentHistoryPaper',
        'Income': 'IncomePaper',
        'Identity': 'IdentityPaper',
        'Pets': 'PetsPaper'
    }
    function handleCommentsClick(type) {
        const typeID = selectedCommentID[type]
        const contentPosition = document.getElementById(typeID).getBoundingClientRect().top + window.scrollY
        setCommentPosition(contentPosition)
        if (commentType === type) {
            setShowComment(!showComment)
        } else {
            setCommentType(type)
            setShowComment(true)
        }
    }

    const addApplicationComment = useAddApplicationComment()
    function handleCommentsPush() {
        if (comment.trim() !== '') {
            const currentDate = (new Date()).toISOString()
            const type_verified = verificationType[commentType]
            addApplicationComment(renterId, propertyId, companyId, comment, userID, currentDate, type_verified)
            getAndSetApplicationComments()
            setComment('')
        }
    }
    
    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={3}>
                    <Outline renter={renter}/>
                </Grid>

                <Grid item xs={6}>
                    <Content 
                        application={application}
                        applicationComment={applicationComment}
                        applicationSupportingDocument={applicationSupportingDocument}
                        renter={renter}
                        renterTenancy={renterTenancy}
                        renterEmployment={renterEmployment}
                        renterPet={renterPet}
                        renterComment={renterComment}
                        handleVerification={handleVerification}
                        handleCommentsClick={handleCommentsClick}
                    />
                </Grid>

                <Grid item xs={3}>
                    <Comment
                        comment={comment}
                        setComment={setComment}
                        showComment={showComment}
                        commentPosition={commentPosition}
                        comments={applicationComment[commentType]}
                        handleCommentsPush={handleCommentsPush}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApplicationDetails