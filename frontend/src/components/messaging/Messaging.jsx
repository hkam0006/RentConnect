import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import { supabase } from "../../supabase";

import ChatHistory from './ChatHistory'
import MessageHistory from './MessageHistory'

import useGetChatByUserID from '../../queries/Message/useGetChatByUserID'
import useGetMessagesByChatID from '../../queries/Message/useGetMessagesByChatID';
import NavigationMenu from '../navigation_menu/NavigationMenus'

function Messaging() {
    const [userID, setUserID] = useState(null)
    const [chatID, setChatID] = useState(null)
    const [comment, setComment] = useState(null)
    const [selectedChatIndex, setSelectedChatIndex] = useState(null)
    const chatHistoryData = useGetChatByUserID(userID)
    const fetchedMessages = useGetMessagesByChatID(chatID);

    useEffect(() => {
        async function getUserID() {
            await supabase.auth.getUser().then((value) =>{
                if (value.data?.user) {
                    setUserID(value.data.user.id)
                }
            })
        }
        getUserID()
    }, [])

    function handleSelectChat(chatIndex) {
        if (selectedChatIndex !== chatIndex) {
            setComment('')
            setSelectedChatIndex(chatIndex)
            setChatID(chatHistoryData[chatIndex].chat_id)
        }
    }

    function handleCommentsPush() {
        console.log(comment)
        setComment('')
    }
    
    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={4}>
                    <ChatHistory data={chatHistoryData} handleSelectChat={handleSelectChat} selectedChatIndex={selectedChatIndex}/>
                </Grid>

                <Grid item xs={8}>
                    <MessageHistory messages={fetchedMessages} userID={userID} comment={comment} setComment={setComment} handleCommentsPush={handleCommentsPush} selectedChat={selectedChatIndex !== null}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Messaging