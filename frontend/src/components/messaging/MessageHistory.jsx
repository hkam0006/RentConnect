import React from 'react'
import { Box, Typography } from '@mui/material'
import MessageBox from './MessageBox'

function MessageHistory({ messages, userID, message, setMessage, HandleMessagesPush, selectedChat }) {
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp)

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    
        return date.toLocaleString(undefined, options)
    }
    
    return (
        <Box>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '66vh', 
                overflow: 'hidden',
                paddingTop: 2
            }}>
                <Box sx={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    display: 'flex', 
                    flexDirection: 'column-reverse', 
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                }}>
                    {messages.map((message, index) => (
                        <Box key={index} sx={{ 
                            display: 'flex', 
                            justifyContent: message.sender_id === userID ? 'flex-end' : 'flex-start'
                        }}>
                            <Box key={index} sx={{
                                marginBottom: 2,
                                padding: 2,
                                borderRadius: 1,
                                backgroundColor: '#ffffff',
                                maxWidth: '80%',
                                boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                            }}>
                                <Typography variant='body1'>{message.content}</Typography>
                                <Typography variant='caption' color='text.secondary'>{formatTimestamp(message.date)}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ paddingRight: 4}}>
                {selectedChat && (
                    <MessageBox message={message} setMessage={setMessage} HandleMessagesPush={HandleMessagesPush} />
                )}
            </Box>
        </Box>
    )
}

export default MessageHistory