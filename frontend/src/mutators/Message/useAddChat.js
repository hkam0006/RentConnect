import { supabase } from "../../supabase";

const useAddChat = () => {
  const addChat = async (recentMessage, recentMessageDate, user1ID, user2ID) => {
    try {
        const { data, error } = await supabase
            .from("CHAT")
            .insert([{ recent_message: recentMessage, recent_message_date: recentMessageDate, user1_id: user1ID, user2_id: user2ID }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return addChat;
}

export default useAddChat
