import { useEffect } from 'react';
import { supabase } from "../../supabase";

const useSubscribeMessageByChatID = (chatID, callback) => {
    useEffect(() => {
        const subscription = supabase
          .channel('message-change-subscriber')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'MESSAGE',
              filter: `chat_id=eq.${chatID}`
            },
            (payload) => {
              callback(payload)
            }
          )
          .subscribe()

        return () => {
          supabase.removeChannel(subscription)
        }
      }, [chatID, callback])
    
    return null
}

export default useSubscribeMessageByChatID
