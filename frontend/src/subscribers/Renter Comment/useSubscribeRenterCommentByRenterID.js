import { useEffect } from "react";
import { supabase } from "../../supabase";

const useSubscribeRenterCommentByRenterID = (renterID, callback) => {
  useEffect(() => {
    const channel = supabase
      .channel("renter-comments-update")
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "renter_comment",
          filter: `renter_id=eq.${renterID}`
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [renterID, callback]);

  return null;
};

export default useSubscribeRenterCommentByRenterID;