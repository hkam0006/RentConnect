import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import useGetApplicationCommentByID from '../../queries/Application Comment/useGetApplicationCommentByID'
import useSubscribeApplicationCommentByRenterID from '../../subscribers/Application Comment/useSubscribeApplicationCommentByID'

import CommentContent from './Comment/CommentContent'
import CommentBox from './Comment/CommentBox'

function Comment({ showComment, commentPosition, commentType }) {
    const { companyId, propertyId, renterId } = useParams()
    const { applicationComments, setApplicationComments } = useGetApplicationCommentByID(propertyId, renterId, companyId)
    const [comments, setComments] = useState([])

    useEffect(() => {
        const filteredComments = applicationComments.filter(comment => comment.type === commentType)
        setComments(filteredComments)
    }, [applicationComments, commentType])

    const updateApplicationComment = useCallback((payload) => {
        console.log(payload)
        switch (payload.eventType) {
            case 'INSERT':
                setApplicationComments(prevComments => [...prevComments, payload.new])
                break
            default:
                break
        }
    }, [setApplicationComments])
    useSubscribeApplicationCommentByRenterID(propertyId, renterId, companyId, updateApplicationComment)

    return (
        <Box>
            {showComment && (
                <Box style={{ position: 'absolute', top: commentPosition + 'px', width: '21%' }}>
                    {comments.map((singleComment, index) =>
                        <CommentContent key={`comment-${index}`} comment={singleComment} />
                    )}
                    <CommentBox commentType={commentType}/>
                </Box>
            )}
        </Box>
    )
}

export default Comment
