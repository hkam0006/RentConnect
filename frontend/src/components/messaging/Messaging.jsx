import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import { supabase } from "../../supabase"

import ChatHistory from './ChatHistory'
import MessageHistory from './MessageHistory'

import useAddMessage from '../../mutators/Message/useAddMessage'
import useSubscribeMessageByUserID from '../../subscribers/Message/useSubscribeMessageByUserID'
import useGetChatByUserID from '../../queries/Message/useGetChatByUserID'
import useGetMessagesByID from '../../queries/Message/useGetMessagesByID'
import NavigationMenu from '../navigation_menu/NavigationMenus'

function Messaging() {
    const [userID, setUserID] = useState(null)
    const [otherID, setOtherID] = useState(null)
    const [message, setMessage] = useState('')
    const chatHistory = useGetChatByUserID(userID)
    const fetchMessages = useGetMessagesByID(userID, otherID)
    const [chatHistoryData, setChatHistoryData] = useState([])
    const [fetchedMessages, setFetchedMessages] = useState([])

    useEffect(() => {
        if (chatHistory != chatHistoryData) {
            setChatHistoryData(chatHistory)
        }
      }, [chatHistory])
    
      useEffect(() => {
        if (fetchMessages != fetchedMessages) {
            setFetchedMessages(fetchMessages)
        }
      }, [fetchMessages])

    useEffect(() => {
        async function getUserID() {
          const { data, error } = await supabase.auth.getUser()
          if (data?.user) {
            setUserID(data.user.id)
          }
        }
        getUserID()
      }, [])

    function handleSelectChat(newOtherID) {
        if (otherID !== newOtherID) {
            setMessage('')
            setOtherID(newOtherID)
        }
    }

    const addMessage = useAddMessage()
    function HandleMessagesPush() {
        if (message.trim() !== '') {
            const currentDate = (new Date()).toISOString()
            addMessage(userID, otherID, currentDate, message)
            setMessage('')
        }
    }
    
    const handleChatChange = (payload) => {
        const newMessage = payload.new
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            // Updating chat history
            setChatHistoryData((prevChatHistory) => {
                const updatedChatHistory = [...prevChatHistory]
                const chatIndex = updatedChatHistory.findIndex(chat =>
                  (chat.sender_id === newMessage.sender_id && chat.receiver_id === newMessage.receiver_id) ||
                  (chat.sender_id === newMessage.receiver_id && chat.receiver_id === newMessage.sender_id)
                )
                if (chatIndex !== -1) {
                    updatedChatHistory[chatIndex] = newMessage
                } else {
                    updatedChatHistory.push(newMessage)
                }
                updatedChatHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
                return updatedChatHistory
            })
            // Update message history
            if (newMessage.receiver_id === otherID || newMessage.sender_id === otherID) {
                setFetchedMessages((prevFetchedMessages) => {
                    const updatedFetchedMessages = [...prevFetchedMessages]
                    updatedFetchedMessages.push(newMessage)
                    updatedFetchedMessages.sort((a, b) => new Date(b.date) - new Date(a.date))
                    return updatedFetchedMessages
                })
            }
        }
    }    
    useSubscribeMessageByUserID(userID, handleChatChange)

    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={4}>
                    <ChatHistory data={chatHistoryData} handleSelectChat={handleSelectChat} currentUserID={userID} otherUserID={otherID} />
                </Grid>

                <Grid item xs={8}>
                    <MessageHistory messages={fetchedMessages} userID={userID} message={message} setMessage={setMessage} HandleMessagesPush={HandleMessagesPush} selectedChat={otherID !== null} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Messaging