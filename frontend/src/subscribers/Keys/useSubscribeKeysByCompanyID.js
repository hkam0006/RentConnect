import { useEffect } from "react";
import { supabase } from "../../supabase";

const useSubscribeKeysByCompanyID = (companyId, callback) => {
  useEffect(() => {
    const channel = supabase 
      .channel("keys-update")
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "KEY",
          'filter': `company_id=eq.${companyId}`
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [companyId, callback])

  return null
}

export default useSubscribeKeysByCompanyID