import { supabase } from "../../supabase";
import { useState, useEffect } from 'react';

const useGetMessagesByID = (user_id, other_id) => {
    const [messages, setMessages] = useState([]);
    const [sortedMessages, setSortedMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (user_id && other_id) {
                const { data, error } = await supabase
                    .from("MESSAGE")
                    .select("*")
                    .or(`and(sender_id.eq.${user_id},receiver_id.eq.${other_id}),and(sender_id.eq.${other_id},receiver_id.eq.${user_id})`)
                    .order("date", { ascending: false });

                if (error) {
                    console.error("Error fetching messages:", error.message);
                } else {
                    setMessages(data);
                }
            }
        };

        fetchMessages();
    }, [user_id, other_id]);

    useEffect(() => {
        const sorted = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date));
        setSortedMessages(sorted);
    }, [messages]);

    return sortedMessages;
};

export default useGetMessagesByID;
