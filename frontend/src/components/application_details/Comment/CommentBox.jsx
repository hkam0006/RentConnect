import React from 'react'
import { Paper, TextField, Button } from '@mui/material'

function CommentBox({ comment, setComment, handleCommentsPush }) {
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