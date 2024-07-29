import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'


const useGetChatByUserID = (user_id) =>{
    const [chat, setChat] = useState([])
  
    useEffect(() => {
      const fetchChats = async () => {
        if (user_id) {
          const { data, error } = await supabase
          .from("CHAT")
          .select("*")
          .eq("user_id", user_id)
          if (error) {
            console.error("Error fetching chats:", error.message)
          } else {
              setChat(data)
          }
        }
      }
  
      fetchChats()
    }, [user_id])
    const sortedChats = chat.sort((a, b) => {
      return new Date(b.recent_message_date) - new Date(a.recent_message_date);
    })
    return sortedChats
  }

export default useGetChatByUserID