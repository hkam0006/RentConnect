import React, { useState } from 'react';
import { Paper, TextField, Button, Box } from '@mui/material';

function CommentBox({ comment, setComment, handleCommentsPush }) {
    return (
        <Paper sx={{ padding: 2, margin: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    className='commentBox'
                    id='commentBox'
                    label='Comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={1}
                    variant='outlined'
                    margin='dense'
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCommentsPush}
                >
                    Send
                </Button>
            </Box>
        </Paper>
    );
}

export default CommentBox;
