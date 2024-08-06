import { supabase } from "../../supabase";
import { useState, useEffect } from "react";

const useGetChatByUserID = (user_id) => {
  const [sortedChats, setSortedChats] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user_id) {
        const { data, error } = await supabase
          .from("MESSAGE")
          .select("*")
          .or(`sender_id.eq.${user_id},receiver_id.eq.${user_id}`)
          .order("date", { ascending: false })

        if (error) {
          console.error("Error fetching messages:", error.message);
        } else {
          const chats = {};
          data.forEach((message) => {
            const chat_id = message.sender_id === user_id ? message.receiver_id : message.sender_id;

            if (!chats[chat_id] || new Date(message.date) > new Date(chats[chat_id].date)) {
              chats[chat_id] = message;
            }
          });

          const chatPreview = Object.values(chats);
          chatPreview.sort((a, b) => new Date(b.date) - new Date(a.date));
          setSortedChats(chatPreview);
        }
      }
    };

    fetchMessages();
  }, [user_id]);
  return sortedChats;
};

export default useGetChatByUserID;
