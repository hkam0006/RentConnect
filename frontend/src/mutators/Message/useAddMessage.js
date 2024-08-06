import { supabase } from "../../supabase";

const useAddMessage = () => {
  const addMessage = async (senderID, receiverID, date, content) => {
    try {
        const { data, error } = await supabase
            .from("MESSAGE")
            .insert([{ sender_id: senderID, receiver_id: receiverID, date: date, content: content }]);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error.message)
    }
  }
  return addMessage;
}

export default useAddMessage
