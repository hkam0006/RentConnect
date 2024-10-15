import { useState } from 'react'
import { Grid, Box } from '@mui/material'

import Outline from './Outline'
import Content from './Content'
import Comment from './Comment'
import NavigationMenu from '../navigation_menu/NavigationMenus'

function ApplicationDetails() {
    const [showComment, setShowComment] = useState(false)
    const [commentPosition, setCommentPosition] = useState(0)
    const [commentType, setCommentType] = useState('')

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

    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={3}>
                    <Outline />
                </Grid>

                <Grid item xs={6}>
                    <Content handleCommentsClick={handleCommentsClick} />
                </Grid>

                <Grid item xs={3}>
                    <Comment showComment={showComment} commentPosition={commentPosition} commentType={commentType} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ApplicationDetails