import React, { useState } from 'react'
import { Box } from '@mui/material'

import CommentContent from './Comment/CommentContent'
import CommentBox from './Comment/CommentBox'

function Comment({ comment, setComment, showComment, commentPosition, comments, handleCommentsPush }) {
    return (
        <Box>
            {showComment && (
                <Box style={{ position: 'absolute', top: commentPosition + 'px', width: '21%' }}>
                    {comments.map((singleComment, index) =>
                        <CommentContent key={`comment-${index}`} comment={singleComment} />
                    )}
                    <CommentBox comment={comment} setComment={setComment} handleCommentsPush={handleCommentsPush} />
                </Box>
            )}
        </Box>
    )
}

export default Comment
