import React from 'react'
import { Box } from '@mui/material'
import ChatBox from './ChatBox'

function ChatHistory({ data, handleSelectChat, currentUserID, otherUserID, uuidToName }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '85vh',
            width: '100%',
            overflow: 'hidden',
        }}>
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': 'none',
                'scrollbar-width': 'none',
            }}>
                {data && (
                    <Box sx={{ padding: 2, width: '100%' }}>
                        {data.map((singleData, index) =>
                            <ChatBox key={`chatBox-${index}`} data={singleData} handleSelectChat={handleSelectChat} currentUserID={currentUserID} otherUserID={otherUserID} uuidToName={uuidToName} />
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ChatHistory
