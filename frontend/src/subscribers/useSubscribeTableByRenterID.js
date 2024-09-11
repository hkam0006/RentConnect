import { useEffect, useCallback } from "react";
import { supabase } from "../supabase";

const useSubscribeTableByRenterID = (table, renterID, callback) => {
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-update`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: `renter_id=eq.${renterID}`
        },
        (payload) => {
          stableCallback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, renterID, stableCallback]);

  const unsubscribe = useCallback(() => {
    supabase.removeChannel(`${table}-update`);
  }, [table]);

  return unsubscribe;
};

export default useSubscribeTableByRenterID;