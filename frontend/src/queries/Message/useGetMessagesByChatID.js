import { supabase } from "../../supabase"
import { useState, useEffect } from 'react'


const useGetMessagesByChatID = (chat_id) =>{
    const [messages, setMessages] = useState([])
  
    useEffect(() => {
      const fetchMessages = async () => {
        if (chat_id) {
          const { data, error } = await supabase
          .from("MESSAGE")
          .select("*")
          .eq("chat_id", chat_id)
          if (error) {
            console.error("Error fetching chats:", error.message)
          } else {
              setMessages(data)
          }
        }
      }
  
      fetchMessages()
    }, [chat_id])
    const sortedMessages = messages.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    return sortedMessages
  }

export default useGetMessagesByChatID