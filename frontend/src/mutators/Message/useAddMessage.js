import { supabase } from "../../supabase";

const useAddMessage = () => {
  const addMessage = async (chatID, senderID, date, content) => {
    try {
        const { data, error } = await supabase
            .from("MESSAGE")
            .insert([{ chat_id: chatID, sender_id: senderID, date, content }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return addMessage;
}

export default useAddMessage
