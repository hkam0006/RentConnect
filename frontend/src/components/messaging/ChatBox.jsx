import React from 'react'
import { Paper, Typography, Card, CardActionArea, CardContent } from '@mui/material'

function ChatBox({ data, handleSelectChat, index, selectedChatIndex }) {
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
        <Card sx={{ marginBottom: '10px', width:'100%', backgroundColor: index==selectedChatIndex ? '#DBCCE5' : '#ffffff' }}>
            <CardActionArea>
                <CardContent onClick={() => handleSelectChat(index)}>
                    <Typography variant='body1'>{data.name}</Typography>
                    <Typography variant='body1' color='text.secondary'>{timeAgo(data.recent_message_date)}</Typography>
                    <Typography variant='body1' color='text.secondary'>{data.recent_message}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ChatBox
