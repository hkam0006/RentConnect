import React from 'react'
import { Paper, Typography } from '@mui/material'

function CommentContent({ comment }) {
    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <Paper sx={{ padding: 2, marginBottom: '30px', width:'100%' }}>
            <Typography variant='body1'>{comment.application_comment_contents}</Typography>
            <Typography variant='body1' color='text.secondary'>{formatDate(comment.application_comment_date)}</Typography>
        </Paper>
    )
}

export default CommentContent