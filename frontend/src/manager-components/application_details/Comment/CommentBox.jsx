import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paper, TextField, Button } from '@mui/material'
import useAddApplicationComment from '../../../mutators/Application Comment/useAddApplicationComment'
import useGetUserID from '../../../queries/useGetUserID'

function CommentBox({ commentType }) {
    const { userID } = useGetUserID();
    const [comment, setComment] = useState('')
    const { companyId, propertyId, renterId } = useParams()

    const addApplicationComment = useAddApplicationComment()
    function handleCommentsPush() {
        if (comment.trim() !== '') {
            const currentDate = (new Date()).toISOString();
            
            addApplicationComment(renterId, propertyId, companyId, comment, userID, currentDate, commentType);
            setComment('');
        }
    }

    return (
        <Paper sx={{ padding: 2, width: '100%', marginBottom: '30px' }}>
            <TextField
                className='commentBox'
                id='commentBox'
                label='Comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant='outlined'
                margin='dense'
            />

            <Button variant='contained' color='primary' onClick={handleCommentsPush}>
                Add Comment
            </Button>
        </Paper>
    )
}

export default CommentBox