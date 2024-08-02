import { useEffect } from 'react'
import { supabase } from "../../supabase"

const useSubscribeChatByUserID = (userID, callback) => {
  useEffect(() => {
    const subscription1 = supabase
      .channel('chat-change-subscriber1')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'CHAT',
          filter: `user1_id=eq.${userID}`
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()

    const subscription2 = supabase
      .channel('chat-change-subscriber2')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'CHAT',
          filter: `user2_id=eq.${userID}`
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription1)
      supabase.removeChannel(subscription2)
    }
  }, [userID, callback])

  return null
}

export default useSubscribeChatByUserID
