import React from 'react'
import { Typography, Card, CardActionArea, CardContent } from '@mui/material'

function ChatBox({ data, handleSelectChat, index, currentChatID, currentUserID }) {
    function timeAgo(dateString) {
        const lastMessageDate = new Date(dateString)
        const now = new Date()
        const timeDifference = Math.floor((now - lastMessageDate) / 1000);

        let interval = Math.floor(timeDifference / 31536000);
        if (interval > 0) {
            return interval + "y";
        }
        interval = Math.floor(timeDifference / 2592000);
        if (interval > 0) {
            return interval + "mo";
        }
        interval = Math.floor(timeDifference / 604800);
        if (interval > 0) {
            return interval + "w";
        }
        interval = Math.floor(timeDifference / 86400);
        if (interval > 0) {
            return interval + "d";
        }
        interval = Math.floor(timeDifference / 3600);
        if (interval > 0) {
            return interval + "h";
        }
        interval = Math.floor(timeDifference / 60);
        if (interval > 0) {
            return interval + "m";
        }
        return Math.floor(timeDifference) + "s";
    }

    return (
        <Card sx={{ marginBottom: '10px', width:'100%', backgroundColor: data.chat_id === currentChatID ? '#DBCCE5' : '#ffffff' }}>
            <CardActionArea>
                <CardContent onClick={() => handleSelectChat(data.chat_id)}>
                    <Typography variant='body1'>{data.user1_id === currentUserID ? data.user2_id : data.user1_id }</Typography>
                    <Typography variant='body1' color='text.secondary'>{timeAgo(data.recent_message_date)}</Typography>
                    <Typography variant='body1' color='text.secondary'>{data.recent_message}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ChatBox
