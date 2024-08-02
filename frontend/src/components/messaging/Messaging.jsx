import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import { supabase } from "../../supabase"

import ChatHistory from './ChatHistory'
import MessageHistory from './MessageHistory'

import useAddMessageByChatID from '../../mutators/Message/useAddMessageByChatID'
import useUpdateChatByChatID from '../../mutators/Message/useUpdateChatByChatID'
import useSubscribeChatByUserID from '../../subscribers/Message/useSubscribeChatByUserID'
import useSubscribeMessageByChatID from '../../subscribers/Message/useSubscribeMessageByChatID'
import useGetChatByUserID from '../../queries/Message/useGetChatByUserID'
import useGetMessagesByChatID from '../../queries/Message/useGetMessagesByChatID'
import NavigationMenu from '../navigation_menu/NavigationMenus'

function Messaging() {
    const [userID, setUserID] = useState(null)
    const [chatID, setChatID] = useState(null)
    const [message, setMessage] = useState('')
    
    const chatHistory = useGetChatByUserID(userID)
    const [chatHistoryData, setChatHistoryData] = useState(null)

    const fetchMessages = useGetMessagesByChatID(chatID)
    const [fetchedMessages, setFetchedMessages] = useState(null)

    useEffect(() => {
        if (chatHistory) {
            setChatHistoryData(chatHistory)
        }
    }, [chatHistory])

    useEffect(() => {
        if (fetchMessages) {
            setFetchedMessages(fetchMessages)
        }
    }, [fetchMessages])

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

    function handleSelectChat(newChatID) {
        if (chatID !== newChatID) {
            setMessage('')
            setChatID(newChatID)
        }
    }

    const addMessage = useAddMessageByChatID()
    const updateChat = useUpdateChatByChatID()
    function HandleMessagesPush() {
        if (message.trim() !== '') {
            const currentDate = (new Date()).toISOString()
            addMessage(chatID, userID, currentDate, message)
            updateChat(chatID, currentDate, message)
            setMessage('')
        }
    }

    const handleChatChange = (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setChatHistoryData(prevData => {
                const updatedChat = payload.new
                const index = prevData.findIndex(chat => chat.id === updatedChat.id)
                let updatedData
                if (index !== -1) {
                    updatedData = [...prevData]
                    updatedData[index] = updatedChat
                } else {
                    updatedData = [...prevData, updatedChat]
                }
                updatedData.sort((a, b) => new Date(b.recent_message_date) - new Date(a.recent_message_date))
                return updatedData
            })
        }
    }    
    useSubscribeChatByUserID(userID, handleChatChange)

    const handleMessageChange = (payload) => {
        console.log(payload)
        if (payload.eventType === 'INSERT') {
            setFetchedMessages(prevData => {
                const updatedChat = payload.new
                const index = prevData.findIndex(chat => chat.id === updatedChat.id)
                let updatedData
                if (index !== -1) {
                    updatedData = [...prevData]
                    updatedData[index] = updatedChat
                } else {
                    updatedData = [...prevData, updatedChat]
                }
                updatedData.sort((a, b) => new Date(b.date) - new Date(a.date))
                return updatedData
            })
        }
    }
    useSubscribeMessageByChatID(chatID, handleMessageChange)
    console.log(chatHistoryData)
    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={4}>
                    <ChatHistory data={chatHistoryData} handleSelectChat={handleSelectChat} currentChatID={chatID} currentUserID={userID} />
                </Grid>

                <Grid item xs={8}>
                    <MessageHistory messages={fetchedMessages} userID={userID} message={message} setMessage={setMessage} HandleMessagesPush={HandleMessagesPush} selectedChat={chatID !== null} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Messaging