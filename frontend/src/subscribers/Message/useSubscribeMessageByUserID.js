import { useEffect } from 'react'
import { supabase } from "../../supabase"

const useSubscribeMessageByUserID = (userID, callback) => {
  useEffect(() => {
    const subscription1 = supabase
      .channel('message-change-subscriber1')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'MESSAGE',
          filter: `sender_id=eq.${userID}`
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()

    const subscription2 = supabase
      .channel('message-change-subscriber2')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'MESSAGE',
          filter: `receiver_id=eq.${userID}`
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

export default useSubscribeMessageByUserID
