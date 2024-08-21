import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box } from '@mui/material'
import { supabase } from "../../supabase"

import ChatHistory from './ChatHistory'
import MessageHistory from './MessageHistory'

import useAddMessage from '../../mutators/Message/useAddMessage'
import useSubscribeMessageByUserID from '../../subscribers/Message/useSubscribeMessageByUserID'
import useGetChatByUserID from '../../queries/Message/useGetChatByUserID'
import useGetMessagesByID from '../../queries/Message/useGetMessagesByID'
import useGetPropertyManagerNameByPropertyManagerIDs from "../../queries/Property Manager/useGetPropertyManagerNameByPropertyManagerIDs"
import useGetRenterNameByRenterIDs from "../../queries/Renter/useGetRenterNameByRenterIDs"
import NavigationMenu from '../navigation_menu/NavigationMenus'

import Fuse from "fuse.js"

const fuseOptions = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.4
}

function Messaging() {
    const { directMessageUserID } = useParams()

    const [userID, setUserID] = useState(null)
    const [otherID, setOtherID] = useState(null)
    const [message, setMessage] = useState('')
    const [chatHistoryData, setChatHistoryData] = useState([])
    const [fetchedMessages, setFetchedMessages] = useState([])
    const [uuidList, setUuidList] = useState([])
    const [uuidToName, setUuidToName] = useState({})
    const [searchedName, setSearchedName] = useState("")

    const chatHistory = useGetChatByUserID(userID)
    const fetchMessages = useGetMessagesByID(userID, otherID)
    const fetchPropertyManagerNames = useGetPropertyManagerNameByPropertyManagerIDs(uuidList, uuidToName)
    const fetchRenterNames = useGetRenterNameByRenterIDs(uuidList, uuidToName)

    const memoizedPropertyManagerNames = useMemo(() => fetchPropertyManagerNames, [fetchPropertyManagerNames])
    const memoizedRenterNames = useMemo(() => fetchRenterNames, [fetchRenterNames])

    const mergedData = useMemo(() => {
        const propertyManagerEntries = Object.entries(memoizedPropertyManagerNames).map(([uuid, name]) => ({ uuid, name }))
        const renterEntries = Object.entries(memoizedRenterNames).map(([uuid, name]) => ({ uuid, name }))
        return [...propertyManagerEntries, ...renterEntries]
    }, [memoizedPropertyManagerNames, memoizedRenterNames])

    const fuse = useMemo(() => new Fuse(mergedData, fuseOptions), [mergedData])

    const handleNameSearch = useCallback((name) => {
        setSearchedName(name)
        if (name.trim() !== "") {
            const searchResults = fuse.search(name)
            const uniqueUUIDs = new Set(searchResults.map(result => result.item.uuid))
            setChatHistoryData(chatHistory.filter(({ sender_id, receiver_id }) => uniqueUUIDs.has(sender_id) || uniqueUUIDs.has(receiver_id)))
        } else {
            setChatHistoryData(chatHistory)
        }
    }, [fuse, chatHistory])

    const addNewChat = useCallback(() => {
        if (!userID || !directMessageUserID) return

        setChatHistoryData(prevData => {
            const exists = prevData.some(chat => chat.sender_id === directMessageUserID || chat.receiver_id === directMessageUserID)
            if (exists) return prevData

            const newChatObject = { sender_id: userID, receiver_id: directMessageUserID }
            setUuidList(prev => [directMessageUserID, ...prev])
            return [newChatObject, ...prevData]
        })
        setOtherID(directMessageUserID)
    }, [userID, directMessageUserID])

    useEffect(() => {
        if (directMessageUserID && userID) {
            addNewChat()
        }
    }, [directMessageUserID, userID, addNewChat])

    useEffect(() => {
        const newUuidToName = { ...memoizedPropertyManagerNames, ...memoizedRenterNames }
        if (JSON.stringify(newUuidToName) !== JSON.stringify(uuidToName)) {
            setUuidToName(newUuidToName)
        }
    }, [memoizedPropertyManagerNames, memoizedRenterNames, uuidToName])

    useEffect(() => {
        if (chatHistory && userID) {
            setChatHistoryData(chatHistory)
            const newUuidList = chatHistory
                .filter(chat => chat.receiver_id === userID || chat.sender_id === userID)
                .map(chat => chat.receiver_id === userID ? chat.sender_id : chat.receiver_id)
            setUuidList(newUuidList)
        }
    }, [chatHistory, userID])

    useEffect(() => {
        if (otherID) {
            setFetchedMessages(fetchMessages)
        }
    }, [otherID, fetchMessages])

    useEffect(() => {
        async function getUserID() {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Error fetching user:", error.message)
            } else if (data?.user) {
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

    const handleChatChange = useCallback((payload) => {
        const newMessage = payload.new
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setChatHistoryData(prevChatHistory => {
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

            if (newMessage.receiver_id === otherID || newMessage.sender_id === otherID) {
                setFetchedMessages(prevFetchedMessages => {
                    const updatedFetchedMessages = [...prevFetchedMessages]
                    const messageIndex = updatedFetchedMessages.findIndex(message =>
                        message.id === newMessage.id
                    )
                    if (messageIndex === -1) {
                        updatedFetchedMessages.push(newMessage)
                        updatedFetchedMessages.sort((a, b) => new Date(b.date) - new Date(a.date))
                    }
                    return updatedFetchedMessages
                })
            }
        }
    }, [otherID])

    useSubscribeMessageByUserID(userID, handleChatChange)

    return (
        <Box sx={{ padding: 2 }}>
            <NavigationMenu />
            <Grid container sx={{ marginTop: '64px', marginLeft: '190px', width: 'calc(100% - 190px)' }}>
                <Grid item xs={4}>
                    <ChatHistory
                        data={chatHistoryData}
                        handleSelectChat={handleSelectChat}
                        currentUserID={userID}
                        otherUserID={otherID}
                        uuidToName={uuidToName}
                        searchedName={searchedName}
                        handleNameSearch={handleNameSearch}
                    />
                </Grid>
                <Grid item xs={8}>
                    <MessageHistory
                        messages={fetchedMessages}
                        userID={userID}
                        message={message}
                        setMessage={setMessage}
                        HandleMessagesPush={HandleMessagesPush}
                        selectedChat={otherID !== null}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Messaging
