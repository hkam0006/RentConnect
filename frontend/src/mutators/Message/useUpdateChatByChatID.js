import { supabase } from "../../supabase";

const useUpdateChatByChatID = () => {
  const updateChat = async (chatID, date, content) => {
    try {
        const { data, error } = await supabase
            .from("CHAT")
            .update([{ recent_message: content, recent_message_date: date }])
            .eq('chat_id', chatID)
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return updateChat;
}

export default useUpdateChatByChatID;
